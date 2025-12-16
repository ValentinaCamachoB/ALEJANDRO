package ActividadFinal;

import java.util.Scanner;

public class SistemaTienda {
     public static void main(String[] args) {
        GestorTienda gestor = new GestorTienda();
        Scanner scanner = new Scanner(System.in);
        
        Producto[] productosIniciales = {
            new Celular(1, "iPhone 15", 3300000, 10, "Apple"),
            new Celular(2, "Galaxy S24", 1900000, 15, "Samsung"),
            new Computador(3, "MacBook Air", 4499000, 8, "M2"),
            new Computador(4, "HP Pavilion", 2200000, 12, "Intel i5"),
            new Tablet(5, "iPad Pro", 5700000, 20, 13),
            new Tablet(6, "Galaxy Tab", 700000, 18, 11)
        };
        

        for (int i = 0; i < productosIniciales.length; i++) {
            gestor.registrarProducto(productosIniciales[i]);
        }
        
        int opcion;
        
        do {
            System.out.print("  SISTEMA DE TIENDA TECNOLOGIA");
            System.out.println();           
             System.out.println("1. Registrar producto");
            System.out.println("2. Listar productos");
            System.out.println("3. Buscar producto");
            System.out.println("4. Actualizar producto");
            System.out.println("5. Eliminar producto");
            System.out.println("0. Salir");
            System.out.print("Opcion: ");
            
            opcion = scanner.nextInt();
            
            switch (opcion) {
                case 1:
                    registrarNuevo(gestor, scanner);
                    break;
                    
                case 2:
                    gestor.listarProductos();
                    break;
                    
                case 3:
                    System.out.print("ID del producto: ");
                    int idBuscar = scanner.nextInt();
                    Producto encontrado = gestor.buscarProducto(idBuscar);
                    
                    if (encontrado != null) {
                        System.out.println("Producto encontrado:");
                        encontrado.mostrarInfo();
                    } else {
                        System.out.println("Producto NO encontrado");
                    }
                    break;
                    
                case 4:
                    System.out.print("ID del producto: ");
                    int idActualizar = scanner.nextInt();
                    scanner.nextLine();
                    
                    System.out.print("Nuevo nombre : ");
                    String nuevoNombre = scanner.nextLine();
                    
                    System.out.print("Nuevo precio : ");
                    double nuevoPrecio = scanner.nextDouble();
                    
                    System.out.print("Nueva cantidad : ");
                    int nuevaCantidad = scanner.nextInt();
                    
                    gestor.actualizarProducto(
                        idActualizar,
                        nuevoNombre.isEmpty() ? null : nuevoNombre,
                        nuevoPrecio,
                        nuevaCantidad
                    );
                    break;
                    
                case 5:
                    System.out.print("ID del producto: ");
                    int idEliminar = scanner.nextInt();
                    gestor.eliminarProducto(idEliminar);
                    break;
                    
                case 0:
                    System.out.println("FIN");
                    break;
                    
                default:
                    System.out.println("Opcion invalida");
            }
            
        } while (opcion != 0);
        
        scanner.close();
    }
    
    public static void registrarNuevo(GestorTienda gestor, Scanner scanner) {
        System.out.print(" REGISTRAR PRODUCTO ");
        System.out.println();
        System.out.println("1. Celular");
        System.out.println("2. Laptop");
        System.out.println("3. Tablet");
        System.out.print("Tipo: ");
        int tipo = scanner.nextInt();
        scanner.nextLine();
        
        System.out.print("ID: ");
        int id = scanner.nextInt();
        scanner.nextLine();
        
        System.out.print("Nombre: ");
        String nombre = scanner.nextLine();
        
        System.out.print("Precio: ");
        double precio = scanner.nextDouble();
        
        System.out.print("Cantidad: ");
        int cantidad = scanner.nextInt();
        scanner.nextLine();
        
        Producto nuevo = null;
        
        if (tipo == 1) {
            System.out.print("Marca: ");
            String marca = scanner.nextLine();
            nuevo = new Celular(id, nombre, precio, cantidad, marca);
            
        } else if (tipo == 2) {
            System.out.print("Procesador: ");
            String procesador = scanner.nextLine();
            nuevo = new Computador(id, nombre, precio, cantidad, procesador);
            
        } else if (tipo == 3) {
            System.out.print("Tamaño pantalla: ");
            double tamano = scanner.nextDouble();
            nuevo = new Tablet(id, nombre, precio, cantidad, tamano);
            
        } else {
            System.out.println("Tipo invalido");
            return;
        }
        
        gestor.registrarProducto(nuevo);
    }
}
