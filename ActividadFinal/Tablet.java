package ActividadFinal;

public class Tablet  extends Producto{
   private double tamanoPantalla;
    
    public Tablet(int id, String nombre, double precio, int cantidadEnStock, double tamanoPantalla) {
        super(id, nombre, precio, cantidadEnStock);
        this.tamanoPantalla = tamanoPantalla;
    }
    
    public double getTamanoPantalla() {
        return tamanoPantalla;
    }
    
    public void setTamanoPantalla(double tamanoPantalla) {
        this.tamanoPantalla = tamanoPantalla;
    }
    
    @Override
    public String getTipo() {
        return "TABLET";
    }
    
    @Override
    public void mostrarInfo() {
        System.out.println();
        System.out.println("ID: " + getId());
        System.out.println("Nombre: " + getNombre());
        System.out.println("Tamaño: " + tamanoPantalla + " pulgadas");
        System.out.println("Precio: $" + getPrecio());
        System.out.println("Stock: " + getCantidadEnStock() + " unidades");
    }
}
