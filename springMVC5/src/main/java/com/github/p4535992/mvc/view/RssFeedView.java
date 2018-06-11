package com.github.p4535992.mvc.view;

import com.rometools.rome.feed.rss.Channel;
import com.rometools.rome.feed.rss.Content;
import com.rometools.rome.feed.rss.Item;
import org.springframework.web.servlet.view.feed.AbstractRssFeedView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by 4535992 on 12/06/2015.
 */
public class RssFeedView extends AbstractRssFeedView {

    @Override
    protected void buildFeedMetadata(Map<String, Object> model, Channel feed,
                                     HttpServletRequest request) {

        feed.setTitle("Sample Title");
        feed.setDescription("Sample Description");
        feed.setLink("http://google.com");

        super.buildFeedMetadata(model, feed, request);
    }


    @Override
    protected List<Item> buildFeedItems(Map<String, Object> model,
                                        HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        obj = (Object) model.get("model");
        //String msg = fruit.getName() + fruit.getQuality();

        List<Item> items = new ArrayList<Item>(1);
        Item item = new Item();
        item.setAuthor("mkyong");
        item.setLink("http://www.mkyong.com");

        Content content = new Content();
        //content.setValue(msg);

        item.setContent(content);

        items.add(item);

        return items;
    }

    public Object obj;

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }
}
