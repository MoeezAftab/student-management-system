import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    static map;
    static find;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseid = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter your name:"
        });
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseid++;
                studentId = "STID" + baseid;
                console.log("\n\tYour account has been created ");
                console.log(`Welcome ${trimmedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["IT", "Eng", "Cooking"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "Eng":
                        courseFees = 500;
                        break;
                    case "Cooking":
                        courseFees = 200;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you Want to enroll in this course"
                });
                if (courseConfirm.ans === true) {
                    let newStudent = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(newStudent);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log("This name already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNamescheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select your name",
                choices: studentNamescheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            if (foundStudent) {
                console.log("\nStudent Information:");
                console.log("ID:", foundStudent.id);
                console.log("Name:", foundStudent.name);
                console.log("Courses Enrolled:", foundStudent.coursesEnrolled.join(", "));
                console.log("Fees Amount:", foundStudent.feesAmount);
                console.log("\n");
            }
            else {
                console.log("Student not found");
            }
        }
        else {
            console.log("Record is Empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
