import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import { UserAddOutlined, GoogleCircleFilled, LoginOutlined } from '@ant-design/icons';
import EmailPasswordRegister from './Emailregister';
import GoogleRegister from './Googleregister';

function AuthPage() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={20} md={12} lg={8}>
        <Card>
          <h2 className="text-center">Login or Sign Up</h2>
          <div className="mb-3">
            <h3 className="text-center">Login with Email</h3>
            <EmailPasswordRegister />
          </div>
          <div className="mb-3">
            <h3 className="text-center">Login with Google</h3>
            <GoogleRegister />
          </div>
          <p className="text-center">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
}

export default AuthPage;
