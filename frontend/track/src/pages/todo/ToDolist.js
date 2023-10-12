import React, { useEffect, useState } from 'react';
import { Input, Button, List, Space, DatePicker, TimePicker, Row, Col } from 'antd';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import axios from 'axios';

const Todo = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(true); // Initially show tasks

  useEffect(() => {
    // Fetch the To-Do list when the component loads
    async function fetchTodoList() {
      try {
        const response = await axios.get('http://localhost:8000/api/Todo/651e56d72d8e62bd74df1cac');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTodoList();
  }, []);

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
        const response = await axios.post('http://localhost:8000/api/Todo/create/651e56d72d8e62bd74df1cac', newTask);
        const savedTask = response.data;
        setTasks([...tasks, savedTask]);
        setTask('');
        setDate(null);
        setTime(null);
      } catch (error) {
        console.error('Error saving the task', error);
      }
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
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
              dataSource={tasks}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      onClick={() => removeTask(index)}
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
                      {item.dateTime.format('YYYY-MM-DD HH:mm')}
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
