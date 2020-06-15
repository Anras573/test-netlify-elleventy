import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;
    const readableDate = format(
      entry.getIn(["data", "date"], new Date()),
      "dd MMM, yyyy"
    );
    const machineDate = format(
      entry.getIn(["data", "date"], new Date()),
      "yyyy-MM-dd"
    );

    return html`
      <main class="container">
        <article class="section">
          <div class="center">
            <div class="post-metadata post-metadata-center">
              <span class="post-date">
                <time datetime="${machineDate}">${readableDate}</time>
              </span>
              <div class="post-tags">
                ${
                  entry.getIn(["data", "tags"], []).map(
                    tag =>
                      html`
                        <a href="#" rel="tag">${tag}</a>
                      `
                  )
                }
              </div>
            </div>
            <h1 class="post-title">${entry.getIn(["data", "title"], null)}</h1>
            <div class="author-footer">${entry.getIn(["data", "author"], null)}</div>
          </div>

          ${this.props.widgetFor("body")}

        </article>
      </main>
    `;
  }
});

export default Post;
