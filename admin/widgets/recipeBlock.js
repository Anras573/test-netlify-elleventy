CMS.registerEditorComponent({
  // Internal id of the component
  id: "recipe-block",
  // Visible label
  label: "Recipe Block",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      label: 'type',
      name: 'type',
      widget: 'select',
      options: ['stk', 'personer']
    },
    {
      label: 'Antal',
      name: 'quantity',
      widget: 'number'
    },
    {
      label: 'Ingredienser',
      name: 'ingredients',
      widget: 'list',
      fields: [
        {
          label: 'Ingrediens',
          name: 'ingredient',
          widget: 'string'
        },
        {
          label: 'Antal',
          name: 'quantity',
          widget: 'number'
        },
        {
          label: 'type',
          name: 'type',
          widget: 'select',
          options: ['stk', 'spsk', 'tsks', 'l', 'dl', 'ml', 'g', 'kg']
        }
      ]
    },
    {
      label: 'Fremgangsmåde',
      name: 'steps',
      widget: 'list',
      fields: [
        {
          label: 'Step',
          name: 'step',
          widget: 'string'
        }
      ]
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^recipe-block ([{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1})/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      json: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return 'recipe-block ' + JSON.stringify(obj);
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    const json = JSON.parse(obj.json);

    if (!json.quantity || !json.type || !json.ingredients || !json.ingredients.length > 0 || !json.steps || !json.steps.length > 0) {
      return '';
    }

    return (`
      <section class="section recipe-block">
        <div class="section-header">
          <h5 class="section-title">Ingredienser</h5>
        </div>

        <div class="recipe-input">
          <label for="type">${json.type}: </label>
          <input name="type" type="number" pattern="[0-9]*" value="${json.quantity}" data-initialValue="${json.quantity}" data-recipeBlock min="1" />
        </div>

        <ul class="ingredients-list">
         ${json.ingredients.map(function(ingredient) {
            if (!ingredient.quantity || !ingredient.type || !ingredient.ingredient) {
              return '';
            }

            return '<li>'
              +'<span data-initialValue="'
                + ingredient.quantity
                + '" data-quantity>'
                + ingredient.quantity
              + '</span> '
              + ingredient.type
              + ' '
              + ingredient.ingredient
            + '</li>' })
          .join('') }
        </ul>

        <div class="section-header">
          <h5 class="section-title">Fremgangsmåde</h5>
        </div>

        <div class="course-of-action">
          ${json.steps.map(function(step, index) {
            if (!step.step) return '';

            let stepCounter = index + 1;

            return '<div class="step">'
            + '<span class="step-number">' + stepCounter + '</span>'
            + '<div class="step-content">' + step.step + '</div>'
            + '</div>'
              })
          .join('') }
        </div>
      </section>`
    );
  }
});
