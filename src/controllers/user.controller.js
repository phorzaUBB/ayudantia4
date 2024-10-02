"user strict";
import User from '../entity/user.entity.js';// User es un modelo de usuario. -> O sea, una representación de una tabla en forma de clase o entidad en JS.
import { AppDataSource } from '../config/configDb.js';

export async function createUser(req,res){
    try {
        const userRepository = AppDataSource.getRepository(User);

        const user = req.body;

        if (!user) {
            return res.status(400).json({
                message: "Es necesario ingresar los datos de usuario.",
                data: null
        });
    }

    const newUser = userRepository.create({
        nombreCompleto: user.nombreCompleto,
        email: user.email,
        rut: user.rut,
        
    });

    const userCreate = await userRepository.save(newUser);

    res.status(201).json({
        message: "Usuario creado exitosamente",
        data: userCreate
    });

} catch (error){
        console.error('Error al crear un usuario, error: ',error);
    }
}

export async function getUser(req,res) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const id = req.params.id;
        const userFound = await userRepository.findOne({
            where: {
                id: id
            }
        })

        if(!userFound){
            return res.status(404).json({
                message:"Usuario no econtrado",
                data: null
            })
        }

        res.status(200).json({
            message: "Usuario encontrado",
            data:userFound
        })
    } catch (error) {
        console.error('Error al obtener un usuario, error: ',error);
    }
}

export async function getUsers(req,res) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if (!users) {
            return res.status(404).json({
                message:"Usuarios no encontrados",
                data:null
            })
        }

        res.status(200).json({
            message: "Usuarios encontrados",
            data: users
        })
    } catch (error) {
        console.error('Error al obtener los usuarios, error: ',error);
    }
}

export async function updateUser(req,res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const id = req.params.id;
        const user = req.body;

        const userFound = await userRepository.findOne({
            where:[{
                id:id
            }]
        });
        if (!userFound) {
            return res.status(404).json({
                message:"Usuario no encontrado",
                data: null
            })
            
        }

        await userRepository.update(id,user);

        const userData = userRepository.findOne({
            where:[{
                id:id
            }]
        })

        res.status(200).json({
            message:"Usuario actualizado exitosamente",
            data:userData
        })
    } catch (error) {
        console.error("Error al actualizar el usuario: ",error);
        res.status(500).json({message:"Error interno del servidor" });
    }
    
}

export async function deleteUser(req,res) {
    try {
        
        const userRepository = AppDataSource.getRepository(User);
        const id = req.params.id

        const userFound = await userRepository.findOne({
            where:[{
                id:id
            }]
        });
        if (!userFound) {
            return res.status(404).json({
                message:"Usuario no encontrado",
                data: null
            })
            
        }

        const userDelete = userRepository.remove(userFound);

        res.status(200).json({
            message:"Usuario eliminado correctamente",
            date:userDelete
        })

    } catch (error) {
        console.error("Error al eliminar el usuario: ",error);
        res.status(500).json({message:"Error interno del servidor" });
    }
}