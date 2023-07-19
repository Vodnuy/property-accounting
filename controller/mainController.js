const Item = require('./../models/Item')
const {getRole} = require("../utils/authToken")
const User = require('./../models/User')
const excelJS = require('exceljs')
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')
const express = require('express')
const multer = require('multer')




class mainController{
    
    async getMainPage(req, res){
        const isAdmin = getRole(req) === 'ADMIN'? true: false
        const items = await Item.find()
        res.render("main",{items, isAdmin})
    } 

    async deleteItem(req,res) {
        try{
            const {id} = req.body
            const result = await Item.deleteOne({_id: id})
            console.log(result)
        }catch(e){
            console.log(e)
            return res.status(400).json({message: "Помилка видалення", e})
        }
    }

    async saveItem(req, res) {
        try{
        const {id, notes} = req.body
        const result = await Item.updateOne({_id: id}, {$set:{notes: notes}})
        console.log(result)
        }catch(e){
            console.log(e)
            return res.status(400).json({message: "Помилка оновлення", e})
        }
    }



    async addItems(req, res){
        try{
            const item = req.body
            console.log(item)
            const result = await Item.create(item)
            console.log(result)
            console.log("Great")
        }catch(e){
            console.log(e);
        }
        
    }


    async exportItems(req, res) {

        try{
            const items = await Item.find().lean().exec();
        
            // Создание нового Workbook
            const workbook = XLSX.utils.book_new();
        
            // Создание нового листа
            const worksheet = XLSX.utils.json_to_sheet(items);
        
            // Добавление листа в книгу
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
        
            // Конвертация книги в bstr формат
            const excelData = XLSX.write(workbook, { type: 'buffer' });
        
            // Сохранение файла локально в проекте
            const filePath = 'Items.xlsx';
            fs.writeFileSync(filePath, excelData, 'binary');
            const file = "";
            res.download(filePath);

            console.log("download")

        
            
        } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
        }
      }
    
       
}

module.exports = new mainController()

