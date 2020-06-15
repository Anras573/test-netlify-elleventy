if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

(function() {
  let items = document.querySelectorAll('[data-recipeBlock]');

  console.log(items);

  for(let i = 0; i < items.length; i++) {
    let ingredientList = items[i];

    ingredientList.addEventListener('change', function(e) {
      const target = e.target;
      const newValue = target.value;
      const initialValue = target.dataset.initialvalue;
      const parent = e.target.parentNode.parentNode;

      let quantities = parent.querySelectorAll('[data-quantity]');

      for(let j = 0; j < quantities.length; j++) {
        let quantityElem = quantities[j];

        let initialQuantity = quantityElem.dataset.initialvalue;
        let quantity = initialQuantity / initialValue * newValue;

        quantityElem.innerHTML = quantity;
      }
    });
  }
})();
