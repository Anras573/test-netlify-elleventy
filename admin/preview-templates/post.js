import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;
    const recipeBlock = entry.getIn(["data", "recipe-list"], false);
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

          ${recipeBlock && html`
            <section class="section recipe-block">
              <div class="section-header">
                <h5 class="section-title">Ingredienser</h5>
              </div>

              <div class="recipe-input">
                <label for="type">${entry.getIn(["data", "recipe-list", "type"], null)}: </label>
                <input name="type" type="number" pattern="[0-9]*" value="${entry.getIn(["data", "recipe-list", "quantity"], null)}" data-initialValue="${entry.getIn(["data", "recipe-list", "quantity"], null)}" data-recipeBlock min="1" />
              </div>

              <ul class="ingredients-list">
                ${
                  entry.getIn(["data", "recipe-list", "ingredients"], []).map(
                    ingredient =>
                      html`
                      <li>
                        <span data-initialValue="${ingredient.getIn(["quantity"])}" data-quantity>
                          ${ingredient.getIn(["quantity"])}
                        </span> ${ingredient.getIn(["type"])} ${ingredient.getIn(["ingredient"])}
                      </li>
                      `
                  )
                }
              </ul>

              <div class="section-header">
                <h5 class="section-title">Fremgangsmåde</h5>
              </div>

              <div class="course-of-action">
                ${
                  entry.getIn(["data", "recipe-list", "steps"], []).map(
                    (step, index) =>
                      html`
                      <div class="step">
                        <span class="step-number">${index + 1}</span>
                        <div class="step-content">${step.getIn(["step"])}</div>
                      </div>
                      `
                  )
                }
              </div>

            </section>
          `
          }

        </article>
      </main>
    `;
  }
});

export default Post;
