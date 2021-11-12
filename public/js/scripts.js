
fetch('/api/productos/', { method: 'GET' }).then(async (data) => {
  const req = await data.json()
  const productsList = req.products.map(e => `<tr><td>${e.name}</td><td>${e.price}</td><td>${e.stock}</td></tr>`).join('')
  console.log(productsList)
  document.getElementById('table').innerHTML += productsList

})
