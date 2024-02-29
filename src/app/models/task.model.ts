export interface Task {
    title: string,
    description: string,
    deadline: string,
    priority: string,
    editState: boolean
}
export interface editedTask extends Partial<Task>{}
