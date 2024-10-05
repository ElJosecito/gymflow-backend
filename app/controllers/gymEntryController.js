import GymEntry from "../models/gymEntryModel.js";
import User from "../models/userModel.js";

// get all gym entries

const getGymEntries = async (req, res) => {
    try {
        const gymEntries = await GymEntry.find();
        res.json(gymEntries);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// get gym entry by id

const getGymEntryById = async (req, res) => {
    try {
        const gymEntry = await GymEntry.findById(req.params.id);
        res.json(gymEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// update gym entry

const updateGymEntry = async (req, res) => {
    try {
        const gymEntry = await GymEntry.findById(req.params.id);
        gymEntry.gymEntry = req.body.gymEntry;
        await gymEntry.save();
        res.json(gymEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// delete gym entry

const deleteGymEntry = async (req, res) => {
    try {

        await GymEntry.findByIdAndDelete(req.params.id);
        res.send("Gym Entry deleted successfully");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//create gym entry
let gymCapacity = 0; // Mantener el número de personas dentro del gym

const createGymEntry = async (req, res) => {
  const { id } = req.body;

  try {
    // Verificar si el usuario con el QR proporcionado existe
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.active){
      return res.status(400).json({ message: 'Usuario no activo', user });
    }

    // Registrar la entrada en el gym
    const gymEntry = new GymEntry({ userId: user._id });
    await gymEntry.save();

    // Agregar la entrada al array de entradas del usuario
    user.gymEntries.push(gymEntry._id);
    await user.save();

    // Incrementar la capacidad del gym
    gymCapacity++;

    // Emitir evento de WebSocket para actualizar la capacidad del gym en tiempo real
    req.io.emit('gymStatusUpdate', {
      message: 'Nuevo usuario ha entrado',
      userId: user._id,
      currentCapacity: gymCapacity // Enviar la capacidad actualizada
    });

    res.status(200).json({ message: 'Acceso registrado correctamente', user:{
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      active: user.active,
      gymEntries: user.gymEntries,
      memberShip: user.memberShip,
      isAdmin: user.isAdmin
    } });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la entrada' });
  }
};

const leaveGymEntry = async (req, res) => {
  
    try {
      
      gymCapacity = Math.max(0, gymCapacity - 1);
  
      // Emitir evento de WebSocket para actualizar la capacidad del gym en tiempo real
      req.io.emit('gymStatusUpdate', {
        message: 'Un usuario ha salido',
        currentCapacity: gymCapacity
      });
  
      res.status(200).json({ message: 'Salida registrada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar la salida' });
    }
  };

//gym reset

const resetGymEntry = async (req, res) => {
    try {
        // await GymEntry.deleteMany({});
        gymCapacity = 0;
        req.io.emit('gymStatusUpdate', {
            message: 'Gym reseteado',
            currentCapacity: gymCapacity
        });
        res.status(200).json({ message: 'Gym reseteado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al resetear el gym' });
    }
}

// current gym capacity
const getGymStatus = async (req, res) => {
  try {
    // Devolver la capacidad actual del gym
    res.status(200).json({ currentCapacity: gymCapacity });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estado del gym' });
  }
};
  
const gymEntryController = {
    getGymEntries,
    getGymEntryById,
    updateGymEntry,
    deleteGymEntry,
    createGymEntry,
    leaveGymEntry,
    resetGymEntry,
    getGymStatus
}

export default gymEntryController;
