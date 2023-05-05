import { Link } from 'react-router-dom';

export default function Inicio({ status }) {
  //const logStatus = useContext(ValueContext);
  function LoggedInOrNot() {
    //console.log(status.log);
    if (status.log) {
      return (
        <>
          <img src={require('../img/user-yes.gif')} alt="logged avatar" width={45} />
          Welcome {status.user} !
        </>
      );
    } else {
      return (
        <>
          <img src={require('../img/user-no.gif')} alt="not-logged avatar" width={45} />
          <Link className='link' to='/login'>Login</Link> or <Link className='link' to='/signup'>SignUp</Link> to perform transactions
        </>        
      );
    } 
  }
  return (
    <div className="inicio-main">
      <div className="inicio-card">
        <h3 className="centered">
          Full-Stack Banking Application
        </h3>
        <div className="inicio-wrapper">
          <div className="inicio-flex1">
            BadBank
            <br />
            <img src={require('../img/bank-logo.gif')} alt="old logo" />
          </div>
          <div className="inicio-flex2">
            Transforms
            <br />
            into →
          </div>
          <div className="inicio-flex3">
            FS Banking App
            <br />
            <img src={require('../img/fs-bank-logo.gif')} alt="new logo" />
          </div>
        </div>
        <div className='inicio-padding'><LoggedInOrNot/></div>
        <div className='inicio-padding'>
          Author: Ramon Cortes &nbsp;
          <a href="mailto:ramoncortes.varios@gmail.com">ramoncortes.varios@gmail.com</a> &nbsp;
          <a href="https://ramon-cortes.github.io/" target="_blank">Portfolio</a>
        </div>
        <div className='inicio-padding smaller'>
          NOTES:
          <br />
          Deployment
          <ul>
            <li>
              Heroku connected to GitHub (auto-deployed from main)
            </li>
            <li>
              GitHub uploaded using git commands
            </li>
            <li>
              Heroku "config vars" for process.env variables. dotenv when working local (development mode)
            </li>
            <li>
              procFile to start my server.js
            </li>
            <li>
              npm run build in frontend folder to create build files
            </li>
            <li>
              Build folder served by app.use(express.static('frontend/build'))
              <br />
              And I had to add more static routes to work when deployed. Otherwise "refreshing" at Heroku caused a "GET" error
            </li>
            <li>
              GitHub .gitignore: In both Server & Frontend → node_modules & .env files
            </li>
            <li>
              Git Repositorie <a href="https://github.com/ramon-cortes/fs-badbank" target="_blank">here</a>          
            </li>
            <li>
              concurrently to start my development mode: "concurrently \"nodemon server.js\" \"cd ./frontend && npm start\""
            </li>
          </ul>   
          DataBase
          <ul>
            <li>
              MongoDB Atlas
            </li>
            <li>
              MongoDB Docker container & "docker exec -it [db-name] bash" only to test Mongo commands
            </li>
            <li>
              Weirdly enough Mongo connections take ≈10 seconds when working from my development environment but ≈1 sec when deployed
            </li>
            <li>
              Created a DAL
            </li>
          </ul>
          Authentication
          <ul>
            <li>
              Google's Firebase Email Authentication (signInWithEmailAndPassword)
            </li>
          </ul>
          Frontend
          <ul>
            <li>
              Created with create-react-app
            </li>
            <li>
              Axios for GET requests
            </li> 
            <li>
              BrowserRouter for routing
            </li>    
            <li>
              process.env.NODE_ENV variable to know if in "production" mode. Then set a variable ("LOCATION") to
              <br />
              "http://ramon-cortesfullstackbankingap.herokuapp.com/" or
              <br />
              "http://localhost:3141". I think this prevents the need to use a "proxy" in the Frontend's package.json file
            </li>   
            <li>
              As expected the use of useState useEffect & createContext
            </li> 
            <li>
              Removed "strict mode" because it renders things twice !
            </li>   
            <li>
            RegEx to validate email format copied from stackoverflow
            </li>
            <li>
              I wanted to experiment a little bit with CSS, so I did not use Bootstrap on this project
            </li>
            <li>
              "BadBank" imaged created by me (by looking at the image you can probably tell)
            </li>
            <li>
              "FS Banking App" image downloaded from internet. I just colored it
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}