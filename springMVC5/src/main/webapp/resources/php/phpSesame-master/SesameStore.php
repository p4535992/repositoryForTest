<?php
//require_once(__DIR__.'/../../../lib/phpSesame/phpSesame.php');
require_once('phpSesame.php');
require_once "HTTP/Request2.php";//The PEAR base directory must be in your include_path

//require_once __DIR__."/SesameResultFormatter.php";

/**
 * Inspired by phpSesame
 */
class SesameStore extends phpSesame implements Store
{
	public function __construct($sesameUrl = '', $repository = null) 
	{
		parent::__construct($sesameUrl,$repository);
	}
	
	public function getOne($q)
	{
		
	}
	public function loadQuery($q)
	{
		
	}
	
	public function getErrors()
	{
		return false;
	}
	
	public function selectQuery($query,$format='')
	{
		$sesameResult = parent::query($query);
		
		//builds an array just like the default ARC2 result format, 
		//because thats what the whole Davine framework was already using
		$result = array('variables' => $sesameResult->getHeaders(),
								'rows' => $sesameResult->getRows());
		
		if($format == 'raw')
		{
			return $result;
		}
		else
		{
			return array(
				'query_type' => 'select',
				'result' => $result
			);			
		}
	}
	
	public function describeQuery($query,$format='')
	{
		/*$start = microtime(true);
		$sesameResult = parent::query($query,parent::TURTLE);
		$time = microtime(true)-$start;

		echo $query."<BR />took ".round($time,5)." seconds in ".$this->repository."<BR />";
		*/
		
		$sesameResult = parent::query($query,parent::TURTLE);
		$result = $sesameResult->getIndexed();
		
		if($format == 'raw')
		{
			return $result;
		}
		else
		{
			return array(
				'query_type' => 'describe',
				'result' => $result
			);			
		}		
		
	}
	
	public function setup()
	{
		$systemStore = new SesameStore($this->dsn,'SYSTEM');
		//TODO: remove this setup stuff entirely, and make it a right of some master domain
		$systemStore->setAuthentication('davine', 'WeAreRisingUp2048');
		$res = $systemStore->selectQuery('
			PREFIX rep: <http://www.openrdf.org/config/repository#>
			SELECT * WHERE { ?s rep:repositoryID "'.$this->repository.'". }');
		
		if(count($res['result']['rows']) > 0)
		{
			echo $this->repository.' already exists!<br />';
			return false;
		}
		
		$context = DSession::getInstance()->getConfigSetting('root').'repositories/'.$this->repository;
		
		if(STATE == 'local')
		{
			$persistance = '
					 ms:persist "true"^^<http://www.w3.org/2001/XMLSchema#boolean> ;
					ms:syncDelay "200000"^^<http://www.w3.org/2001/XMLSchema#long>';
		}
		else
		{
			$persistance = '
					 ms:persist "true"^^<http://www.w3.org/2001/XMLSchema#boolean> ;
					ms:syncDelay "200000"^^<http://www.w3.org/2001/XMLSchema#long>';
			/*$persistance = '
					 ms:persist "false"^^<http://www.w3.org/2001/XMLSchema#boolean>';*/
		}
		
		$systemStore->append('
			@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
			@prefix rep: <http://www.openrdf.org/config/repository#>.
			@prefix sr: <http://www.openrdf.org/config/repository/sail#>.
			@prefix sail: <http://www.openrdf.org/config/sail#>.
			@prefix ms: <http://www.openrdf.org/config/sail/memory#>.

			<'.$context.'> a rep:RepositoryContext.
			[] a rep:Repository ;
			   rep:repositoryID "'.$this->repository.'" ;
			   rdfs:label "'.$this->repository.'" ;
			   rep:repositoryImpl [
				  rep:repositoryType "openrdf:SailRepository" ;
				  sr:sailImpl [
					 sail:sailType "openrdf:MemoryStore" ;
					 '.$persistance.'
				  ]
			   ].',$context ,self::TURTLE);
		
		//;
		//ms:syncDelay "500"^^<http://www.w3.org/2001/XMLSchema#long>

		//"openrdf:SailRepository"
		//"openrdf:MemoryStore"
		//"openrdf:NativeStore"
	}

	public function insertQuery($q)
	{
		return parent::updateQuery($q);
	}
	
	public function deleteQuery($q)
	{
		return parent::updateQuery($q);
	}
	
	public function addFromFile($filePath,$graph='null',$format=Store::INPUT_RDFXML)
	{
		$this->appendFile($filePath,$graph,$format);
		return true;
	}
	public function getName()
	{
		return $this->repository;
	}


    const REPOSITORY='24';


    /**
     * href: https://github.com/anfho93/programate/blob/master/lib/SesameStore.php
     * @param string $query
     * @return phpSesame_SparqlRes
     * @throws Exception
     */
    public function query($query)
    {
        $sesame = array ('url' => 'http://localhost:8080/openrdf-sesame', 'repository' => self::REPOSITORY);
        $store = new phpSesame($sesame['url'], $sesame['repository']);

        $resultFormat = phpSesame::SPARQL_XML;
        $lang = "sparql";
        $infer = true;
        //echo $query;

        $result = $store->query($query, $resultFormat, $lang,'true');// $infer);

        return $result;
    }

    /**
     * href: https://github.com/anfho93/programate/blob/master/lib/SesameStore.php
     * @param $rdfPath
     * @param $rdfName
     */
    public function loadFile($rdfPath, $rdfName)
    {
        //print_r("in loadFile");
        $sesame = array ('url' => 'http://localhost:8080/openrdf-sesame', 'repository' => self::REPOSITORY);
        $store = new phpSesame($sesame['url'], $sesame['repository']);
        $context = "<file://". $rdfName .">"; // Optional - defaults to entire repository though.
        $inputFormat = phpSesame::TURTLE; // Optional - defaults to RDFXML
        //print_r("in loadFile: ");
        $store->appendFile($rdfPath, $context, $inputFormat);

    }

}
?>
