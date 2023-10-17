import React from 'react';
import Jumbotron from '../components/Jumbotron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  return (
    <>
      <div className={'jumbotron text-danger h1 font-weight-bold text-center'}>
        <Jumbotron text={['Trackify', 'Made With Love By', 'Aviral & Avi']} />
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Upload your Time Table</h5>
                <p className="card-text">Click this button to upload your time table.</p>
                <a href="/timetable" className="btn btn-primary">Upload</a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Update User Info</h5>
                <p className="card-text">Click this button to update your user information.</p>
                <a href="/userInfo" className="btn btn-primary">Update</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac
          neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique,
          tortor mauris maximus ante, ut suscipit lectus dolor sed odio.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>Social Media</h4>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="#" className="text-light">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-light">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-light">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h4>Contact Info</h4>
              <p>Email: example@example.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;


