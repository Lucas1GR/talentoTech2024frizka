document.addEventListener("DOMContentLoaded", () => 
  {
    const productosContainer = document.querySelector("#productos-container");
    fetch("https://dummyjson.com/products?limit=9")
    .then((response) => response.json())
    .then((data) => {
      var productos = data.products;
      // Limpia el contenedor de productos
      productosContainer.innerHTML = "";
      // Genera las cards de productos
      productos.forEach((product) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "col-md-4";
        cardDiv.innerHTML = `
          <div class="card mt-3">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text fw-bold">Precio: $${product.price}</p>
              <button class="btn btn-success mt-auto">Agregar</button>
            </div>
          </div>
        `;
        // Agregar evento al botón "Agregar"
        const botonAgregar = cardDiv.querySelector("button");
        botonAgregar.addEventListener("click", () => {
          agregarAlCarrito(product);
        });
          // Añadir la card al contenedor
          productosContainer.appendChild(cardDiv);
      });
    })
    .catch((error) => console.error("Error de conexion:", error));
    
  function agregarAlCarrito(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Verificar si SweetAlert2 está funcionando con un log
    console.log('Producto agregado al carrito:', product.title);

    // Usar SweetAlert2 para mostrar la alerta
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `${product.title} ha sido agregado al carrito.`,
      confirmButtonText: '¡Genial!'
    });
  }
  // Carga inicial de productos
  fetchProductos(currentPage);
  });

