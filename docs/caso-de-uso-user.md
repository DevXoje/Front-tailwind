```mermaid
graph TD;
  Usuario-->Navegar;
  Usuario-->Buscar_Producto;
  Buscar_Producto-->Ver_Producto;
  Usuario-->Realizar_Compra;
  Usuario-->Ver_Historial;
  Ver_Historial-->Ver_Producto;
  Navegar-->Ver_Producto;
  Ver_Producto-->Agregar_Al_Carrito;
  Agregar_Al_Carrito-->Realizar_Compra;
  Realizar_Compra-->Generar_Factura;
  Realizar_Compra-->Actualizar_Inventario;
  Realizar_Compra-->Enviar_Confirmacion;
```
