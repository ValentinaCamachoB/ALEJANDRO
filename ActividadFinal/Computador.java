package ActividadFinal;

public class Computador  extends Producto{
   private String procesador;
    
    public Computador(int id, String nombre, double precio, int cantidadEnStock, String procesador) {
        super(id, nombre, precio, cantidadEnStock);
        this.procesador = procesador;
    }
    
    public String getProcesador() {
        return procesador;
    }
    
    public void setProcesador(String procesador) {
        this.procesador = procesador;
    }
    
    @Override
    public String getTipo() {
        return "COMPUTADOR";
    }
    
    @Override
    public void mostrarInfo() {
        System.out.println();
        System.out.println("ID: " + getId());
        System.out.println("Nombre: " + getNombre());
        System.out.println("Procesador: " + procesador);
        System.out.println("Precio: $" + getPrecio());
        System.out.println("Stock: " + getCantidadEnStock() + " unidades");
    }
}
