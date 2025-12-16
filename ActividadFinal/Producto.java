package ActividadFinal;

public abstract class Producto {
    private int id;
    private String nombre;
    private double precio;
    private int cantidadEnStock;
    
    public Producto(int id, String nombre, double precio, int cantidadEnStock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadEnStock = cantidadEnStock;
    }

    public void setId(int id) {
        this.id = id;
    }
    public int getId() {
        return id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public double getPrecio() {
        return precio;
    }
    
    public void setPrecio(double precio) {
        this.precio = precio;
    }
    
    public int getCantidadEnStock() {
        return cantidadEnStock;
    }
    
    public void setCantidadEnStock(int cantidadEnStock) {
        this.cantidadEnStock = cantidadEnStock;
    }
    
    public abstract String getTipo();
    public abstract void mostrarInfo();
}

