# STEPS TO USE CUSTOM VARIABLES ON WEB PAGES

1. Add a table in BC into the WYSIWYG editor with your variables names.

```html
<table style="height: 196px; width: 345px;">
<tbody>
    <tr>
        <td>[hero_title]</td>
        <td>title here</td>
    </tr>
    <tr>
        <td>[hero_description]</td>
        <td>description here</td>
    </tr>
    <tr>
        <td>[hero_partner_1_title]</td>
        <td>title here</td>
    </tr>
    <tr>
        <td>[hero_partner_1_icon]</td>
        <td>image link here</td>
    </tr>
    <tr>
        <td>[hero_partner_1_text]</td>
        <td>content here</td>
    </tr>
     <tr>
        <td>[hero_video_id]</td>
        <td>467567567</td>
    </tr>
</tbody>
</table>
```

2. Print the BC field into your template and wrap the field with a `div` with the attribute `data-dynamic-content-table`

```html
<div data-dynamic-content-table="" style="display: none;"> 
 {{{page.content}}}
</div>
```

3. Put your variables as attributes over the necessary markups. The attribute name should start with `data-`.


Examples:

```html
    <!-- It will use the .text() in the js to print the value-->
    <h3 data-hero_title="text"></h3>

    <!-- EXAMPLE USING COMPONENTS  .attr('src') and .text() -->
    {{> components/partner/partner-content header ="<span data-partner_1_title='text'></span>" 
        img-icon="<img class=partner-img' data-partner_1_icon='src' src='' />"
        text="<div data-partner_1_text='text'></div>"}}

    <!-- EXAMPLE MODIFYING OTHER ATTRIBUTES - The value of the attribute should start with "attr-" -->
    <a class="button button--secondary button--white button--large vpop"  data-hero_video_id="attr-data-id" data-type="vimeo" data-id="" data-autoplay="true">Watch The Video</a>

    <!-- EXAMPLE using html as value for the attribute. It prints all the html tags. - .html() -->
    {{> components/common/content img-orientation="left" size="small" 
        img="<div data-block_1_image='html'></div>"
        header="<span data-block_1_heading='text'></span>"
        text="<div data-block_1_text='html'></div>"}}

    <!--EXAMPLE TO PRINT AS BACKGROUND IMAGE ON STYLE - The value of the attribute should be "style-background-image"-->
    <div class="hero" data-hero_background_image="style-background-image" style="background-image: url('');"></div>

```


# The value for the attributes can be:

1. `text` (It will use `.text()` in js)
2. `html` (It will use `.html()` in js and will keep all the markups)
3. `src` (It will use `.attr('src')` in js)
4. `href` (It will use `.attr('href')` in js)
5. `style-background-image` (It will use `.attr('style', 'background-image: url(value)')` in js)
6. `attr-` (It will use `.attr(attr_value.replace('attr-',''), value)` in js)

