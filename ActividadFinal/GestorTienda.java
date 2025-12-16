package ActividadFinal;
import java.util.ArrayList;

public class GestorTienda {
    private ArrayList<Producto> productos;
    
    public GestorTienda() {
        productos = new ArrayList<>();
    }
    
    // registrar producto 
    public void registrarProducto(Producto producto) {
        for (int i = 0; i < productos.size(); i++) {
            if (productos.get(i).getId() == producto.getId()) {
                System.out.println("Ya existe un producto con ese ID");
                return;
            }
        }
        
        productos.add(producto);
        System.out.println("Producto registrado correctamente");
    }
    
    // 2. listar productos
    public void listarProductos() {
        if (productos.size() == 0) {
            System.out.println("No hay productos registrados");
            return;
        }
        
        System.out.println("     LISTA DE PRODUCTOS     ");
        for (int i = 0; i < productos.size(); i++) {
            Producto p = productos.get(i);
            System.out.println();
            System.out.print("Tipo: " + p.getTipo());
            p.mostrarInfo();        
        }
    }
    
    // 3. buscar con id 
    public Producto buscarProducto(int id) {
        for (int i = 0; i < productos.size(); i++) {
            if (productos.get(i).getId() == id) {
                return productos.get(i);
            }
        }
        return null;
    }
    
    // 4. actualziar producto
    public void actualizarProducto(int id, String nuevoNombre, double nuevoPrecio, int nuevaCantidad) {
        Producto producto = buscarProducto(id);
        
        if (producto == null) {
            System.out.println("Producto NO encontrado");
            return;
        }
        
        if (nuevoNombre != null) {
            producto.setNombre(nuevoNombre);
        }
        if (nuevoPrecio > 0) {
            producto.setPrecio(nuevoPrecio);
        }
        if (nuevaCantidad >= 0) {
            producto.setCantidadEnStock(nuevaCantidad);
        }
        
        System.out.println("Producto actualizado correctamente");
    }
    
    // 5. eliminar prodcuto
    public void eliminarProducto(int id) {
        Producto producto = buscarProducto(id);
        
        if (producto == null) {
            System.out.println("Producto NO encontrado");
            return;
        }
        
        productos.remove(producto);
        System.out.println("Producto eliminado correctamente");
    }
}