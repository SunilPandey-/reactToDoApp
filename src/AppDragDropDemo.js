import React, { Component } from 'react';
import './App.css';

export default class AppDragDropDemo extends Component {

    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.state = {
            tasks: [
                { name: "Website redesign", category: "wip", bgcolor: "#FFFF55" },
                { name: "Mobile App", category: "wip", bgcolor: "#FFFF55" },
                { name: "OnBoarding designs", category: "complete", bgcolor: "#228B33" },
                { name: "Client Meeting", category: "todo", bgcolor: "#FF4566" },
                { name: "Social Media Posts", category: "review", bgcolor: "cyan" }
            ]
        }
    }


    delete(key) {
       // console.log('isnside detelte', key);
        let filteredItems = this.state.tasks.filter((item) => {
            
            return (item.name !== key)
        });

        this.setState({
            tasks: filteredItems
        })
    }
    addItem(e) {
        if (this._inputElement.value !== "") {
            let newItem = {
                name: this._inputElement.value,
                category: "todo",
                bgcolor: "#FF4566"
            }

            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newItem)
                };
            }

            );
        }
        this._inputElement.value = "";
        //console.log(this.state.tasks);
        e.preventDefault();
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) => {
            if (task.name == id) {
                task.category = cat;
            }
            if (task.category == "complete") {
                task.bgcolor = "#228B33";
            }
            if (task.category == "wip") {
                task.bgcolor = "#FFFF55";
            }
            if (task.category == "review") {
                task.bgcolor = "cyan";
            }
            if (task.category == "todo") {
                task.bgcolor = "#FF4566";
            }


            return task;
        });

        this.setState({
            ...this.state,
            tasks

        });


    }
    onDragStart = (ev, id) => {
       // console.log('dragStart', id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    render() {
        var tasks = {
            wip: [],
            complete: [],
            todo: [],
            review: []
        }
        this.state.tasks.forEach((t) => {
            tasks[t.category].push(

                <div key={t.name}
                    onDragStart={(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: t.bgcolor }}
                    onDoubleClick={() => this.delete(t.name)}
                >
                    
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <h2 className="header"> Studio Board</h2>

                <div className="todoListMain">
                    <form onSubmit={this.addItem} id="search-form_3">
                        
                            <input className="search_3"
                                ref={(a) => this._inputElement = a}
                                placeholder="enter task">
                            </input>
                            <button type="submit" className="submit_3">

                                Add Task</button>
                        
                    </form>
                </div>

                <h4 >Double Click to remove any task</h4>



                <div className="todo"
                    onDragOver={(e) => { this.onDragOver(e) }}
                    onDrop={(e) => this.onDrop(e, "todo")}
                >
                    <span className="task-header">BackLog</span>
                    {tasks.todo}
                </div>

                <div className="wip"
                    onDragOver={(e) => { this.onDragOver(e) }}
                    onDrop={(e) => this.onDrop(e, "wip")}
                >
                    <span className="task-header">In Progress</span>
                    {tasks.wip}
                </div>

                <div className="review"
                    onDragOver={(e) => { this.onDragOver(e) }}
                    onDrop={(e) => this.onDrop(e, "review")}
                >
                    <span className="task-header">Review</span>
                    {tasks.review}
                </div>


                <div className="droppable" onDragOver={(e) => { this.onDragOver(e) }}
                    onDrop={(e) => this.onDrop(e, "complete")}>
                    <span className="task-header">Complete</span>
                    {tasks.complete}
                </div>
            </div>
        );
    }
}