/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package ec.edu.espe.producto;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

/**
 *
 * @author Admin
 */
public class productoServlet extends HttpServlet {
    
    productoJpaController  productFunctions = new productoJpaController();
    producto product = null;
    JSONObject respuesta = new JSONObject();
    
    protected void listarProductos(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, ServletException, IOException {
        ArrayList<producto> listaProductos = new ArrayList<producto>(productFunctions.findproductoEntities());

        ArrayList<JSONObject> productosJson = new ArrayList<>();

        for (producto producto : listaProductos) {
            JSONObject productoJsonaux = new JSONObject();
            productoJsonaux.put("id", new Integer(producto.getId()));
            productoJsonaux.put("nombre", producto.getNombre());
            productoJsonaux.put("precio", new Double(producto.getPrecio()));
            productosJson.add(productoJsonaux);
        }

        JSONObject respuesta = new JSONObject();
        respuesta.put("productos", productosJson);

        PrintWriter out = response.getWriter();
        out.println(respuesta);
        out.flush();

    }

   protected void listarProducto(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, ServletException, IOException {
        JSONObject productoJson = new JSONObject();
        productoJson.put("id", new Integer(product.getId()));
        productoJson.put("nombre", product.getNombre());
        productoJson.put("precio", new Double(product.getPrecio()));
        JSONObject respuesta = new JSONObject();
        respuesta.put("productos", productoJson);
        PrintWriter out = response.getWriter();
        out.println(respuesta);
        out.flush();
   
   }
    

   
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        try {
            String accion = request.getParameter("accion") == null ? "" : request.getParameter("accion");
            int id = request.getParameter("id") == null ? 0 : Integer.parseInt(request.getParameter("id"));
            String nombre = request.getParameter("nombre") == null ? "" : request.getParameter("nombre");
            double precio = request.getParameter("precio") == null ? 0.0 : Double.parseDouble(request.getParameter("precio"));


            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            PrintWriter out = response.getWriter();

            switch (accion) {
                case "":
                    listarProductos(request, response);
                    break;
                case "Crear":
                    if (!nombre.equals("")) {
                        product = new producto(nombre, precio);
                        productFunctions.create(product);
                        respuesta.put("message", "Producto Creado exitosamente");
                        out.println(respuesta);
                        out.flush();
                   } else {
                       respuesta.put("message", "Datos Incompletos");
                       out.println(respuesta);
                        out.flush();
                    }
                    break;
                case "Editar":
                    if (id != 0 && !nombre.equals("") && precio != 0.0) {
                        product = new producto(id, nombre, precio);
                        productFunctions.edit(product);
                        respuesta.put("message", "Producto Actualizado exitosamente");
                        out.println(respuesta);
                        out.flush();
                    } else {
                        respuesta.put("message", " Datos Incompletos");
                        out.println(respuesta);
                        out.flush();
                    }
                    break;
                case "Eliminar":
                    if (id != 0) {
                        productFunctions.destroy(id);
                        respuesta.put("message", "Producto Eliminado exitosamente");
                        out.println(respuesta);
                        out.flush();
                    } else {
                        respuesta.put("message", "Incompleto");
                        out.println(respuesta);
                        out.flush();
                    }
                    break;
                case "Buscar":
                    if (id != 0) {
                        product = productFunctions.findproducto(id);
                        if (product != null) {
                            listarProducto(request, response);
                        } else {
                            respuesta.put("message", "Producto no encontrado");
                            out.println(respuesta);
                            out.flush();
                        }
                    } else {
                        respuesta.put("message", "ID no proporcionado");
                        out.println(respuesta);
                        out.flush();
                    }
                    break;

                default:
                    throw new AssertionError();
            }
        } catch (Exception ex) {
            Logger.getLogger(productoServlet.class.getName()).log(Level.SEVERE, null, ex);
        } 
  
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
