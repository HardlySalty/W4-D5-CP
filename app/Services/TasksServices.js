import { appState } from "../AppState.js"
import { Task } from "../Models/Task.js"
import { todoApi } from "./axiosService.js"


class TasksServices{
    
    async updateTask(taskId) {
        const taskToUpdate = appState.tasks.find(e => e.id == taskId)
        // @ts-ignore
        const res = await todoApi.put(taskId, { completed: !taskToUpdate.completed })
        // @ts-ignore
        taskToUpdate.completed = !taskToUpdate?.completed
    }

    async getTasks() {
        const res = await todoApi.get('')
        let tasks = res.data.map(e => new Task(e))
        appState.tasks = tasks
        
    }

    async createTask(formData) {
        const res = await todoApi.post('', formData)
        const newTask = new Task(res.data)
        
        appState.tasks.unshift(newTask)
        appState.emit('tasks')
    }

}

export const tasksServices = new TasksServices()