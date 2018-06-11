<?php
/**
 * Created by: René Verheij
 * Date: 22/05/14
 */

namespace davine\ontologies\storage\sesame;
use davine\core\collections\TripleCollection;
use davine\core\models\UriResource;
use davine\ontologies\storage\MimeTypes;
use davine\ontologies\storage\SparqlRdfResult;
use davine\ontologies\storage\SparqlStore;
use davine\ontologies\storage\SparqlVariableResult;
use davine\core\components\Utils;
use ErrorException;
use davine\ontologies\ui\UserInterface;
use Exception;

class SesameStorePro extends SparqlStore
{
	protected $username;
	protected $password;

    /**
     * A collection of blanknodes that is to be used during the parsing of results.
     * Should only contain blanknodes that come from the exact same resources as those that are queried,
     * Like this, it can be used to match blanknodes in between requests
     * @var $blanknodePool UriResourceDictionary
     */
    protected $blanknodePool;

    public function __construct($resource)
	{
		//authenticate ourselves as the server
		$this->username = getSetting('sesame','username');
		$this->password = getSetting('sesame','password');
		parent::__construct($resource);
	}

    /**
     * @param $query
     * @param bool $infer
     * @param string $resultFormat
     * @return array
     * @throws ErrorException
     */
    private function getQuery($query,$infer=true,$resultFormat=MimeTypes::VARIABLE_JSON)
	{
		//By default we use post, because long queries may not fit in GET, and Sesame supports SELECT queries through POST as well
		$url = $this->getValue('storage:public-endpoint');
        $this->logQuery('POST',$url,$query);
        $this->prependPrefixes($query);
        $params = array('query'=>$query,'queryLn'=>'sparql','infer'=>$infer ? "true" : "false");


		//TODO: replace with nicer PHP wrapper \curl\Curl:
		/*$curl = new Curl();
        $curl->setHeader("Accept",MimeTypes::RDF_XML);
        $curl->get($this->getUriResource()->uri);
        if($curl->error) ... else print_r($curl->response);
		*/

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($params));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.':'.$this->password);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: '.MimeTypes::FORM_URL_ENCODED,
			"Accept: ".$resultFormat
		));

		$result = curl_exec($ch);

		if($result === false)
		{
            $curlError = curl_error($ch);
            if(strstr($curlError,"Failed connect to"))
            {
                UserInterface::addWarning("The server could not connect to the triplestore");
                //TODO: we removed the thrown error so that we can instead notify the user
                //but how are we - the maintainers of the software and the server - going
                //to be notified that the triplestore is down??
            }
			//throw new ErrorException('Error in request to SesameStore: '.curl_error($ch).'. Request URL: '.$url);
		}

		$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close ($ch);
		//print_r($status_code);
		//print_r($server_output);exit;
		return array('response'=>$result,'responseType'=>$resultFormat,'statusCode'=>$statusCode);
	}

	public function getGraphs()
	{
		///openrdf-sesame/repositories/mem-rdf/contexts
		$url = $this->getValue('storage:public-endpoint').'/contexts';

        $this->logQuery('GET',$url);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.':'.$this->password);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: '.MimeTypes::FORM_URL_ENCODED,
			"Accept: ".MimeTypes::VARIABLE_JSON
		));

		$result = curl_exec ($ch);
		$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close ($ch);

		$resultObject = json_decode($result);

		$graphs = array();
		foreach($resultObject->results->bindings as $binding)
		{
			$graphs[] = $binding->contextID->value;
		}
		return $graphs;
		//return new SparqlVariableResult(array('response'=>$result,'responseType'=>MimeTypes::VARIABLE_JSON,'statusCode'=>$statusCode));
	}


    /**
     * we do not overwrite processQuery, since unlike selectQuery and describeQuery it queues its updates
     * so instead we overwrite processUpdateQuery, which is called when the queue is processed
     * @param $query
     * @param bool $infer
     * @param string $resultFormat
     * @return bool
     * @throws ErrorException
     */
	protected function processUpdateQuery($query,$infer=false,$resultFormat=MimeTypes::VARIABLE_JSON)
	{
		$url = $this->getValue('storage:public-endpoint').'/statements';
        $this->logQuery('POST',$url,$query);
        $this->prependPrefixes($query);
        $params = array('update'=>$query,'queryLn'=>'sparql','infer'=> $infer ? "true" : "false");

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($params));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.':'.$this->password);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: '.MimeTypes::FORM_URL_ENCODED,
			"Accept: ".$resultFormat
		));

		$result = curl_exec ($ch);
		//$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close ($ch);

		if($result === false)
		{
            try {
                $errorMsg = curl_error($ch);
            }
            catch (Exception $e)
            {
                $errorMsg = 'Invalid curl resource';
            }
			throw new ErrorException('Error in request to SesameStore: '.$errorMsg.' - '.$url);
		}
		else if($result !== '')
		{
			echo $query;
			throw new ErrorException('Error in update request to SesameStore: '.$result.'. Query: '.$query);
		}
		return true;

	}

	public function selectQuery($query,$infer=true,$format=MimeTypes::VARIABLE_JSON)
	{
		$result = $this->getQuery($query,$infer,$format);
		return new SparqlVariableResult($result,$this->blanknodePool);
	}
	public function describeQuery($query,$includeImplicitFromStore=true,$format=MimeTypes::RDF_JSON)
	{
		$result = $this->getQuery($query,$includeImplicitFromStore,$format);
		//any DESCRIBE query returns all properties of the resource being described, thus these resource are concidered 'fully loaded'
		return new SparqlRdfResult($result,$this->blanknodePool,true);
	}

    public function constructQuery($query, $infer=true,$format=MimeTypes::RDF_JSON)
    {
        $result = $this->getQuery($query,$infer,$format);
        return new SparqlRdfResult($result,$this->blanknodePool);
    }


	public function getGraph($graph='',$includeImplicit=true,$calcPrefixes=false,$doReasoning=true)
	{
		//first we get the contents of the graph (explicit facts only)
		//for which sesame has a specific API:
		$url = $this->getValue('storage:public-endpoint').'/rdf-graphs/service?graph='.urlencode($graph);

        $this->logQuery('GET',$url);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.':'.$this->password);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: '.MimeTypes::FORM_URL_ENCODED,
			"Accept: ".MimeTypes::RDF_JSON
		));

		$result = curl_exec ($ch);
		//$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close ($ch);

		if($result === false)
		{
			throw new ErrorException('Error in request to SesameStore: '.curl_error($ch).' - '.$url);
		}

		$jsonObject = json_decode($result);
		if($jsonObject)
		{
            //if we're already including the implicit facts we don't need to do reasoning now
            $inferImplicit = !$includeImplicit && $doReasoning;
			$triples = Utils::parseRdfJson($jsonObject, $this->blanknodePool, true, $calcPrefixes,$inferImplicit);
		}
		else
		{
			throw new ErrorException("Invalid json response from store while getting graph contents: ".$result);
		}

		//next, if required, we get the implicit facts
		if($includeImplicit)
		{
			$filter = '';
			$or = '';

			$subjects = $triples->getSubjects();

			foreach($subjects as $subject)
			{
				if(!$subject->bnode)
				{
					$filter .= $or.'?s = <'.$subject->uri.'>';
					$or = " || ";
				}
			}
            //sesame:nil contains all the implicit facts
			$q = "SELECT * FROM sesame:nil WHERE { ?s ?p ?o. FILTER (".$filter.") }";
            $this->setBlanknodePool($triples->getBlankNodes());
			$res = $this->selectQuery($q,true);
			$implicitTriples = $res->getTriplesFromRows(["s","p","o"],false,true);
			$triples->addFromCollection($implicitTriples);
		}

		if($doReasoning)
		{
			global $core;
			$triples->addFromCollection($core->reasoner->doTriples($triples,false,true));
		}

		return $triples;
	}

	public function removeGraph(UriResource $graph)
	{
		//first we get the contents of the graph (explicit facts only)
		//for which sesame has a specific API:
		$url = $this->getValue('storage:public-endpoint').'/rdf-graphs/service?graph='.urlencode($graph->uri);
        $this->logQuery('DELETE',$url);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.':'.$this->password);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: '.MimeTypes::FORM_URL_ENCODED,
			"Accept: ".MimeTypes::RDF_JSON
		));

		$result = curl_exec ($ch);
		//$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close ($ch);

		if($result === false)
		{
			throw new ErrorException('Error in request to SesameStore: '.curl_error($ch).' - '.$url);
		}

        return $result === '';
	}

    protected function getImplicitGraphQuery()
    {
        //sesame is where all the implicit statements live in sesame stores
        return "FROM sesame:nil";
    }


    private function setBlanknodePool($bnodes)
    {
        $this->blanknodePool = $bnodes;
    }


}