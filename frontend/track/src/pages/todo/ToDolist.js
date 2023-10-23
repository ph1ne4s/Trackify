import React, { useEffect, useState } from 'react';
import { Input, Button, List, Space, DatePicker, TimePicker, Row, Col } from 'antd';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css'; 
import axios from 'axios';

const Todo = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [todos, setTodos] = useState([]); 
  const [showTasks, setShowTasks] = useState(true);

  const userId = '651e56d72d8e62bd74df1cac';

  const baseUrl = 'http://localhost:8000';
  const todoUrl = `${baseUrl}/api/user/${userId}/todo`;

  useEffect(() => {
    async function fetchTodoList() {
      try {
        const response = await axios.get('http://localhost:8000/api/user/651e56d72d8e62bd74df1cac/Todos');
        setTodos(response.data.todos); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTodoList();
  }, [userId]);

  const toggleTasksVisibility = () => {
    setShowTasks(!showTasks);
  };

  const addTask = async () => {
    if (task.trim() !== '' && date && time) {
      const newTask = {
        task: task,
        dateTime: moment(`${date.format('YYYY-MM-DD')} ${time.format('HH:mm')}`),
      };
      try {
        const response = await axios.post(todoUrl, newTask);
        const savedTask = response.data;
        setTodos([...todos, savedTask]);
        setTask('');
        setDate(null);
        setTime(null);
      } catch (error) {
        console.error('Error saving the task', error);
      }
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`${todoUrl}/${taskId}`);
      const updatedTodos = todos.filter((item) => item._id !== taskId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting the task', error);
    }
  };

  return (
    <div className="container mt-5">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <h1 className="text-center mb-4" style={{ color: 'navy' }}>
            Todo List
          </h1>
          <Input
            className="mb-3"
            placeholder="Enter a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Space className="mb-3">
            <DatePicker
              value={date}
              onChange={(value) => setDate(value)}
              format="YYYY-MM-DD"
              style={{ width: '120px' }}
            />
            <TimePicker
              value={time}
              onChange={(value) => setTime(value)}
              format="HH:mm"
              style={{ width: '100px' }}
            />
            <Button type="primary" onClick={addTask}>
              Add Task
            </Button>
          </Space>
          <Button onClick={toggleTasksVisibility}>
            {showTasks ? 'Hide Tasks' : 'Show Tasks'}
          </Button>
          {showTasks && (
            <List
              className="mb-3"
              itemLayout="horizontal"
              dataSource={todos} // Updated to use "todos" state
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      onClick={() => removeTask(item._id)}
                    >
                      Delete
                    </Button>
                  ]}
                >
                  <div>
                    <div className="task" style={{ fontSize: '18px' }}>
                      {item.task}
                    </div>
                    <div className="datetime" style={{ color: 'darkgreen' }}>
                      {moment(item.dateTime).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Todo;
