from flask import Flask, render_template, abort

app = Flask(__name__)

PROJECTS = {
    "nesso": {
        "number": "03",
        "category": "Data Engineering",
        "title": "NESSO Safety Monitoring System",
        "subtitle": "IoT-based worker safety monitoring using wearable NESSO sensors, BLE, Python and an interactive Flask dashboard.",
        "image": "dashboard.jpg",
        "summary": (
            "The NESSO Safety Monitoring System is an IoT-based project developed to monitor worker movements "
            "and identify potential workplace safety incidents using wearable NESSO sensors. Four NESSO devices "
            "collect accelerometer and gyroscope data at 2 Hz and transmit the readings to a laptop through "
            "Bluetooth Low Energy (BLE). A Python application processes the sensor data, calculates movement "
            "features, and uses threshold-based logic to classify worker activities and safety events such as "
            "Near Miss, Slip/Trip/Fall (STF), and Fall From Height (FFH). Processed readings and detected events "
            "are stored in an SQLite database and displayed through an interactive Flask web dashboard. "
            "A separate version of the dashboard was deployed using Render for browser-based access to the "
            "stored dataset, while live BLE sensor collection continues to run locally."
        ),
        "dashboard_features": [
            {
                "title":"Worker Search",
                "description":"Search and view records for specific workers.",
                "detail":"ANDREA · SANIYA · TRILO · YXING",
                "image":"nesso/worker-search.png"
            },
            {
                "title":"Date and Time Filter",
                "description":"Retrieve records within a selected date and time range.",
                "detail":"Historical date-time filtering",
                "image":"nesso/date-time-filter.png"
            },
            {
                "title":"Event Filters",
                "description":"Filter safety events individually to focus on a specific incident category.",
                "detail":"Near Miss · STF · FFH",
                "image":"nesso/event-filters.png"
            },
            {
                "title":"Latest Worker Status",
                "description":"View the latest status of all four workers at one glance.",
                "detail":"Real-time local worker overview",
                "image":"nesso/latest-worker-status.png"
            },
            {
                "title":"Highlighted Events",
                "description":"Important events are colour-highlighted so users can identify them quickly.",
                "detail":"Orange — Near Miss · Red — STF · Purple — FFH",
                "image":"nesso/highlighted-events.png"
            },
            {
                "title":"Analysis and Report",
                "description":"Daily incident graphs and incident-distribution summaries support safety analysis.",
                "detail":"Trend and distribution analysis",
                "image":"nesso/analysis-report.png"
            }
        ],
        "problem": (
            "Raw sensor readings are difficult to interpret directly, especially when multiple workers and large "
            "amounts of historical data are involved. The project needed a way to collect motion data, detect "
            "possible safety incidents, store the results and make them easy to inspect."
        ),
        "solution": (
            "Four NESSO devices collect accelerometer and gyroscope readings at 2 Hz and send them to a laptop using BLE. "
            "Python processes the incoming readings and applies threshold-based logic to classify movement and safety events. "
            "The processed records are stored in SQLite and presented through a Flask dashboard for searching, filtering, "
            "monitoring and analysis."
        ),
        "contribution": [
            "Configured and worked with four NESSO devices for worker monitoring.",
            "Used 2 Hz accelerometer and gyroscope sampling for movement-data collection.",
            "Implemented BLE communication between the NESSO devices and laptop.",
            "Worked with Python processing logic for movement features and safety-event classification.",
            "Stored processed sensor readings and detected events in an SQLite database.",
            "Developed worker search, date/time filtering and event filtering.",
            "Added latest worker status cards and highlighted Near Miss, STF and FFH events.",
            "Added daily incident graphs and incident-distribution visualisations.",
            "Prepared the web application for deployment through GitHub and Render."
        ],
        "tools":["Python","Flask","SQLite","BLE","Arduino","NESSO Sensors","HTML/CSS/JavaScript","Chart.js","GitHub","Render"],
        "outcome": (
            "The final prototype combines local live BLE sensor collection with an online dashboard for remote analysis "
            "of the stored dataset, demonstrating an end-to-end data engineering workflow from sensing and processing "
            "to database storage, visualisation and deployment."
        ),
        "live_url":"https://nesso-safety-dashboard.onrender.com/"
    },

    "engineering": {
        "number":"01",
        "category":"Engineering",
        "title":"Engineering Exploration Project",
        "subtitle":"Designing and prototyping a tri-star wheelchair concept to help self-propelled wheelchair users overcome curbs more independently.",
        "image":"wheelchair.jpg",
        "overview": (
            "The Engineering Exploration Project focused on improving wheelchair mobility for users who face difficulty "
            "mounting curbs. Our team explored multiple concepts before developing a tri-star wheelchair solution designed "
            "to help users overcome curbs more independently."
        ),
        "problem": (
            "Conventional self-propelled wheelchairs can make curbs difficult to overcome, which may force users to take "
            "longer routes or depend on ramps. The project explored how a wheelchair could be modified so that a person "
            "with disabilities could overcome curbs more independently."
        ),
        "solution": (
            "The final concept used a tri-star wheel arrangement at the front of the wheelchair. Multiple wheels rotate "
            "around a central hub so the mechanism can climb over a raised curb. The electrical concept used an Arduino Uno, "
            "a slide switch and a DC motor to operate the mechanism."
        ),
        "process":[
            {
                "number":"01",
                "title":"Ideation Process",
                "description":(
                    "We began with a Crazy 8s ideation exercise to generate different wheelchair concepts. "
                    "Ideas included larger front wheels, a curb-climber wheelchair, belt or tank wheels, "
                    "piston-assisted wheels, a lower centre of gravity and a tri-star wheelchair."
                ),
                "image":"engineering/ideation.png"
            },
            {
                "number":"02",
                "title":"Concept Selection",
                "description":(
                    "The concepts were compared using a Value Effort Map. This helped us compare the value each idea "
                    "could provide to wheelchair users against the development effort required by the team."
                ),
                "image":"engineering/value-effort-map.png"
            },
            {
                "number":"03",
                "title":"Circuit Design",
                "description":(
                    "The circuit used an Arduino Uno as the microcontroller. A slide switch acted as the input and "
                    "activated a DC motor used to operate the tri-star wheel mechanism."
                ),
                "image":"engineering/circuit-diagram.png"
            },
            {
                "number":"04",
                "title":"3D Wheelchair Design",
                "description":(
                    "A 3D wheelchair model was developed to visualise how the tri-star wheel system could be integrated. "
                    "The design included the push handle, frame, brake, front rigging, arm rest, back rest, foot rest, "
                    "rear wheels and tri-star wheels."
                ),
                "image":"engineering/wheelchair-3d.png"
            },
            {
                "number":"05",
                "title":"Tri-Star Wheel Design",
                "description":(
                    "The tri-star wheel was modelled in more detail, including the motor location and front and rear views "
                    "of the wheel arrangement."
                ),
                "image":"engineering/tristar-3d.png"
            },
            {
                "number":"06",
                "title":"Prototype Construction",
                "description":(
                    "The physical mechanism was constructed by attaching a rotatable part to an axle, building a triangular "
                    "structure around the axle, attaching wheels to the ends and connecting the completed assembly to the motor."
                ),
                "image":"engineering/prototype-construction.png"
            },
            {
                "number":"07",
                "title":"Prototype Development & Refinement",
                "description":(
                    "Several versions were tested before reaching the final design. Earlier versions had problems including "
                    "uneven spacing, parts that were too small and insufficient room for the axle, so the mechanism was refined."
                ),
                "image":"engineering/prototype-development.png"
            }
        ],
        "contribution":[
            "Worked as the team's Drafter.",
            "Produced the 3D wheelchair design sketches.",
            "Developed front and rear views of the tri-star wheel and motor arrangement.",
            "Helped communicate how the tri-star mechanism would integrate with the wheelchair.",
            "Created the storyboard showing how the user would activate the tri-star wheels to overcome a curb.",
            "Contributed to design development, presentation and refinement of the solution."
        ],
        "tools":["Engineering Design","3D Sketching","Prototyping","Arduino Uno","DC Motor","Circuit Design","Testing","Design Thinking"],
        "outcome":(
            "The final prototype demonstrated the concept of replacing conventional front caster wheels with a tri-star "
            "wheel system to help a wheelchair overcome curbs. The project also highlighted further improvement areas "
            "such as shock absorption, suspension and additional safety features."
        )
    },

    "fitness": {
        "number":"02",
        "category":"IoT & Embedded Systems",
        "title":"Smart Fitness Band",
        "subtitle":"An IoT wearable system that combines activity tracking, ambient-light sensing, inactivity alerts, Raspberry Pi processing, database logging and a Flask web interface.",
        "image":"fitness/fitness-band.jpg",

        "overview":(
            "The Smart Fitness Band is a wearable IoT device developed to encourage healthier everyday habits by "
            "tracking user movement and ambient light conditions. A step counter monitors physical activity while "
            "a light sensor provides environmental context. By combining both readings, the system can distinguish "
            "between active periods, prolonged daytime inactivity and periods of rest or sleep."
        ),

        "problem":(
            "People who spend long periods studying, working at a desk or using digital devices may remain inactive "
            "without noticing it. Basic activity trackers may also treat legitimate rest or sleep as inactivity. "
            "The project therefore aimed to create a wearable monitoring system that could provide relevant activity "
            "alerts while reducing unnecessary notifications during low-light rest periods."
        ),

        "solution":(
            "The Arduino reads step-count and ambient-light data and applies threshold-based logic to determine the "
            "user's status. When no movement is detected for 10 seconds in a bright environment, the red LED turns on "
            "and the buzzer plays an alert. When it is dark and there is no movement, the system assumes the user is "
            "resting or sleeping and suppresses the inactivity alert. Sensor information is sent by serial communication "
            "to a Raspberry Pi, stored in MariaDB and made available through a Flask web interface."
        ),

        "system_flow":[
            {
                "number":"01",
                "title":"System Architecture",
                "description":(
                    "The complete IoT workflow connects the step counter and light sensor to an Arduino. The Arduino "
                    "handles sensor readings and inactivity logic, while a Raspberry Pi receives the processed data "
                    "through serial communication. The Raspberry Pi logs the records in MariaDB and serves the data "
                    "to a Flask web interface."
                ),
                "image":"fitness/system-architecture.png"
            },
            {
                "number":"02",
                "title":"Real-Time Arduino Processing",
                "description":(
                    "The Arduino continuously reports light level, step count, bright/dark status, movement detection, "
                    "red LED state and buzzer state. The Serial Monitor screenshot shows a bright environment with no "
                    "movement, causing the RedLED to switch ON and the alert song to play."
                ),
                "image":"fitness/arduino-serial.png"
            },
            {
                "number":"03",
                "title":"Raspberry Pi Integration",
                "description":(
                    "Python running on the Raspberry Pi receives and parses the Arduino serial data. The values are "
                    "converted into readable information including light status, movement status, LED status and buzzer status."
                ),
                "image":"fitness/raspberry-pi-output.png"
            },
            {
                "number":"04",
                "title":"Database Logging",
                "description":(
                    "A Python script inserts sensor readings into the MariaDB database. Each record includes the user, "
                    "light reading, step count and an alert status. The screenshot confirms a successful database update."
                ),
                "image":"fitness/database-insert.png"
            },
            {
                "number":"05",
                "title":"MariaDB Data Storage",
                "description":(
                    "The MariaDB table stores the project data with fields for timestamp, light level, step count and "
                    "alert state, allowing the readings to be reviewed historically and displayed through the web application."
                ),
                "image":"fitness/database-table.png"
            }
        ],

        "features":[
            {
                "title":"Step & Movement Tracking",
                "description":"A Grove step-counter sensor detects movement and tracks the user's step count."
            },
            {
                "title":"Ambient Light Detection",
                "description":"A Grove light sensor measures environmental brightness so the system can distinguish daytime inactivity from low-light rest."
            },
            {
                "title":"Smart Inactivity Alert",
                "description":"After 10 seconds without movement in a bright environment, the system activates a red LED and buzzer reminder."
            },
            {
                "title":"Sleep / Rest Awareness",
                "description":"When no movement occurs in a dark environment, the system suppresses alerts instead of treating the user as inactive."
            },
            {
                "title":"Real-Time LCD Feedback",
                "description":"The LCD displays current light and step information directly on the wearable prototype."
            },
            {
                "title":"Data Logging & Web Access",
                "description":"The Raspberry Pi stores readings in MariaDB and Flask provides browser-based access to the logged data."
            }
        ],

        "testing":[
            {
                "condition":"Bright environment + no movement for 10 seconds",
                "result":"Inactive alert triggered; buzzer/LED activated",
                "status":"PASS"
            },
            {
                "condition":"Low-light environment + no movement for 10 seconds",
                "result":"Rest/sleep recognised; no alert triggered",
                "status":"PASS"
            },
            {
                "condition":"Continuous movement / increasing step count",
                "result":"Normal/active state; inactivity alert remains off",
                "status":"PASS"
            },
            {
                "condition":"Movement detected after an inactivity alert",
                "result":"Alert stops and status returns to normal",
                "status":"PASS"
            },
            {
                "condition":"Arduino data received by Raspberry Pi every 5 seconds",
                "result":"Database updated and dashboard refreshed successfully",
                "status":"PASS"
            }
        ],

        "contribution":[
            "Worked on the Smart Fitness Band as part of a two-person project team.",
            "Integrated activity and environmental sensing using the step counter and light sensor.",
            "Worked with Arduino logic for movement, light conditions, LED alerts, buzzer alerts and LCD feedback.",
            "Connected Arduino output to the Raspberry Pi through serial communication.",
            "Used Python on the Raspberry Pi to parse sensor readings.",
            "Logged processed readings and alert states into a MariaDB database.",
            "Worked with Flask and HTML to display stored project data through a web interface.",
            "Tested bright, dark, active and inactive conditions and verified successful database updates."
        ],

        "tools":[
            "Arduino Uno","Raspberry Pi","Python","Arduino IDE","Flask","MariaDB",
            "Serial Communication","Grove Step Counter","Grove Light Sensor",
            "LCD","Red LED","Buzzer","HTML"
        ],

        "outcome":(
            "The completed prototype successfully demonstrated an end-to-end IoT workflow from sensing and embedded "
            "processing to Raspberry Pi communication, database storage and browser-based visualisation. All five "
            "documented test cases passed. The project also highlighted how combining multiple sensors can produce "
            "more meaningful activity decisions than relying on movement data alone."
        ),

        "video":"fitness-demo.mp4"
    }
}

@app.route("/")
def home():
    return render_template("index.html", projects=PROJECTS)

@app.route("/project/<slug>")
def project_detail(slug):
    project = PROJECTS.get(slug)
    if not project:
        abort(404)
    return render_template("project.html", project=project, slug=slug)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
