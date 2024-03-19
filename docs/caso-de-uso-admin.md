```mermaid
graph TD;
    Admin-->Gestionar_Inventario;
    Admin-->Gestionar_Usuarios;
    Admin-->Gestionar_Categorias;
    Admin-->Generar_Reportes;
    Gestionar_Inventario-->Agregar_Producto;
    Gestionar_Inventario-->Modificar_Producto;
    Gestionar_Inventario-->Eliminar_Producto;
    Gestionar_Usuarios-->Agregar_Usuario;
    Gestionar_Usuarios-->Modificar_Usuario;
    Gestionar_Usuarios-->Eliminar_Usuario;
    Gestionar_Categorias-->Agregar_Categoria;
    Gestionar_Categorias-->Modificar_Categoria;
    Gestionar_Categorias-->Eliminar_Categoria;
    Generar_Reportes-->Visualizar_Reportes;
```
