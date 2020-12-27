## Fast - Load only what you need and shorten page load times (just like spa)

Your project mimics the single page application working logic.
Instead of calling the same resources over and over on each page while browsing through the site, you can save both time and traffic by calling only once when the project is opened.

# Example

For example, I measured the effort she spent while opening the product detail page on amazon.com
![Optional Text](../master/ss.png)

# Usage

Just let me know the changed part of the page and for which links it will be active.

```html
<script>
    new Fast({
        fromSelector: "#pageContent",
        toSelector: "#pageContent",
        linkSelector: "a.redirectLink",
        analytics: false,
        changeUrl: true,
        changeTitle: true,
        onBefore: function(e) {
            console.log(e);
        },
        onFinished: function(e) {
            console.log(e);
        },
        onError: function(e) {
            console.log(e);
        }
    });
</script>
```


## Props

| Option             | Type         | Description                                    |
| ------------------ | ------------ | ---------------------------------------------- |
| `fromSelector`     | String       |  |
| `toSelector`       | String       |  |
| `linkSelector`     | String       |  |
| `analytics`        | Boolean      |  |
| `changeUrl`        | Boolean      |  |
| `changeTitle`      | Boolean      |  |
| `onBefore`         | function     |  |
| `onFinished`       | function     |  |
| `onError`          | function     |  |