package ActividadFinal;

public class Celular extends Producto{
  private String marca;
    
    public Celular(int id, String nombre, double precio, int cantidadEnStock, String marca) {
        super(id, nombre, precio, cantidadEnStock);
        this.marca = marca;
    }
    
    public String getMarca() {
        return marca;
    }
    
    public void setMarca(String marca) {
        this.marca = marca;
    }
    
    @Override
    public String getTipo() {
        return "CELULAR";
    }
    
    @Override
    public void mostrarInfo() {
        System.out.println();
        System.out.println("ID: " + getId());
        System.out.println("Nombre: " + getNombre());
        System.out.println("Marca: " + marca);
        System.out.println("Precio: $" + getPrecio());
        System.out.println("Stock: " + getCantidadEnStock() + " unidades");
    }
}

