import multer from "multer";
import path from "path";

// Configuración del almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Carpeta donde se almacenan los archivos
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); // Obtener marca de tiempo
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        const fileName = path.basename(file.originalname, ext); // Nombre del archivo sin extensión
        cb(null, `${fileName}_${timestamp}${ext}`); // Generar el nuevo nombre del archivo
    }
});

// Crear middleware de carga de archivos
const upload = multer({ storage: storage });

export default upload;
