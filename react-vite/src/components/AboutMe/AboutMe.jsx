import { useEffect, useState } from "react"
import "./AboutMe.css"
import { useNavigate } from "react-router-dom"

export default function AboutMe() {
    const navigate = useNavigate()
    const [seeMore, setSeeMore] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState({})
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    function onSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        fetch("https://formcarry.com/s/pW8vrw_OPkn", {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(response => {
          if (response.code === 200) {
            navigate('/about-me')
            setName("")
            setEmail("")
            setMessage("")
            setSuccess(true)
            window.scrollTo({top: 0, behavior: 'smooth'})
          }
          else if(response.code === 422){
            // Field validation failed
            setError(response.message)
          }
          else {
            // other error from formcarry
            setError(response.message)
          }
        })
        .catch(error => {
          // request related error.
          setError(error.message ? error.message : error);
        });
      }


    return (
        <div className="about-me">
            {success && <p className="message-success">✅ Message successfully sent</p>}
            <h1>About Me</h1>
            <div className="about-me-body">
                <p>
                    I&apos;m a passionate learner and creative at heart, constantly seeking new challenges to fuel my growth. I welcome each opportunity and challenge with open arms, whether it&apos;s tackling complex problems or pushing creative boundaries. During my upbringing, which involved frequently relocating and during my time as professional content creator, I&apos;ve learned how to adapt and thrive in fast-changing environments. Let&apos;s connect and explore the exciting possibilities together!
                </p>
                <p className="body-separator see-more-less" onClick={() => setSeeMore(!seeMore)}>
                    {!seeMore ?
                    <>
                    ⬇️ A bit more in depth ⬇️ <br/>
                    (click to expand)
                    </>
                    :
                    <>
                    ⬆️ A bit less in depth ⬆️ <br />
                    (click to collapse)
                    </>
                    }
                </p>
                {seeMore &&
                <>
                    <p>
                        I&apos;m 25 and live in Denver, CO but am actually from Key West, FL... Kind of. I moved around a lot growing up, I was in 14 schools before graduating and Key West was where I had lived the longest, prior to CO. I was a content-creator from 14 - 21 and live-streaming professionally from 19-21. I made the grueling decision to put down content creation and move to CO after a falling-out with a previous romantic partner, which ultimately led to an overall career change for me.
                    </p>
                    <p>
                        When I first got to Colorado, I was fortunate enough to know some people that were willing to take me in as an apprentice for Welding and Metal Fabrication. Though, that was short lived due to the Covid pandemic going into full effect a few short months after I moved, which resulted in me being let go. This led me towards doing gig-work like Uber, Grubhub, Lyft, etc. Which has been my primary income for the last 3 1/2 years. This gig work provided me the opportunity to pay my bills amidst the pandemic but, also, more importantly the ability to reflect on what I wanted to pursue as a career path.
                    </p>
                    <p>
                        Throughout the latter half of 2022 I was working on my exit strategy from the gig industry and in April of 2023, there were some unsavory events that demonstrated that the dangers of picking up complete and total strangers are still very real, even on platforms like Uber and Lyft. These events promptly caused me to escalate the rate of my exit plan. I started doing heavy research into different programming bootcamps and after much consideration I eventually came to the decision that AppAcademy was the best choice for me. I enrolled in late July 2023 and officially started classes at the beginning of August.
                    </p>
                    <p>
                        My time at AppAcademy has stretched me in ways that I didn&apos;t know possible, but has thus allowed me to come out on the other end with a newfound passion, set of skills, and a new hope for the future.
                    </p>
                </>
                }
            </div>

            {/* <h2 className="section-header">My Skills</h2>
            <div className="technologies">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-plain-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-plain-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" />
            </div> */}

            <h2 className="section-header">Contact Me</h2>
            <p className="contact-me-subheader">Have a question or interested in my work? Feel free to reach out through the form below. I look forward to connecting and discussing how my skills and experience align with your organization's goals.</p>
            <div className='contact-me-body'>
                <form className="contact-me-form" onSubmit={(e) => onSubmit(e)}>

                    <div className="formcarry-block input-container">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" required/>
                        <span className={name ? "input2" : "input1"}>Name</span>
                    </div>

                    <div className="formcarry-block input-container ">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required/>
                        <span className={email ? 'input2' : 'input1'}>Email</span>
                    </div>

                    <div className="formcarry-block input-container">
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" required />
                        <span className={message ? "input2" : "input1"}>Enter your message...</span>
                    </div>

                    <div className="formcarry-block">
                        <button className="submit-contact" type="submit">Send</button>
                    </div>
                </form>

                <div className="personal-info-container">
                    <ul className="personal-info-list">
                        <li className="personal-info-item">
                            <h3 className="fa-solid fa-home"/>
                            <span>
                                8587 W Hampden Ave. <br />
                                Denver, CO 80227 <br />
                                United States
                            </span>
                        </li>
                        <li className="personal-info-item">
                            <h3 className="fa-solid fa-mobile-screen-button"/>
                            (305) 570-8392
                        </li>
                        <li className="personal-info-item">
                            <h3 className="fa-solid fa-envelope"/>
                            <a className="email" href="mailto:ainsworthcorbin@gmail.com">ainsworthcorbin@gmail.com</a>
                        </li>
                        <li className="personal-info-item">
                            <h3 className='fa-brands fa-linkedin'/>
                            <a className="linkedin" href="https://www.linkedin.com/in/corbin-ainsworth-18a885232/" target="_blank" rel="noreferrer">LinkedIn</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}