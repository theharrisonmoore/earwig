import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import axios from "axios";
import Yup from "yup";
import classNames from "classnames";

import { ReviewRapper } from "./Review.style";
import Question from "./Question/index1";
import agencyIcon from "./../../../assets/agencyIcon.svg";

const initialValues = {
  questions: {
    agency1: ""
  }
};
class Review extends Component {
  state = {
    questions: []
  };
  componentDidMount() {
    axios
      .get("/api/questions")
      .then(res => {
        this.setState({ questions: res.data });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  render() {
    if (!this.state.questions[0]) {
      return null;
    }
    const { questions } = this.state;
    return (
      <ReviewRapper>
        <section className="review-header">
          <div className="content">
            <p>You're reviewing</p>
            <div className="org">
              <img src={agencyIcon} alt="" />
              Total Recruitment
            </div>
            <p className="review-info">18 questions 2min</p>
          </div>
        </section>

        <section className="questions">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div className="question-container">
                  <p>Select the month(s) you used this agency?</p>
                </div>
                <Question question={questions[0]} />

                <button type="submit" disabled={isSubmitting}>
                  Submit your review
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </ReviewRapper>
    );
  }
}

export default Review;
// import React, { Component } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import moment from "moment";
// import axios from "axios";
// import Yup from "yup";
// import classNames from "classnames";

// import { ReviewRapper } from "./Review.style";
// import Question from "./Question/index";
// import agencyIcon from "./../../../assets/agencyIcon.svg";

// const initialValues = {
//   questions: {
//     agency1: ""
//   }
// };
// class Review extends Component {
//   state = {
//     questions: []
//   };
//   componentDidMount() {
//     axios
//       .get("/api/questions")
//       .then(res => {
//         this.setState({ questions: res.data });
//       })
//       .catch(err => {
//         console.log("err", err);
//       });
//   }
//   render() {
//     if (!this.state.questions[0]) {
//       return null;
//     }
//     const { questions } = this.state;
//     return (
//       <ReviewRapper>
//         <section className="review-header">
//           <div className="content">
//             <p>You're reviewing</p>
//             <div className="org">
//               <img src={agencyIcon} alt="" />
//               Total Recruitment
//             </div>
//             <p className="review-info">18 questions 2min</p>
//           </div>
//         </section>

//         <section className="questions">
//           <Formik
//             initialValues={initialValues}
//             onSubmit={(values, { setSubmitting }) => {
//               setTimeout(() => {
//                 alert(JSON.stringify(values, null, 2));
//                 setSubmitting(false);
//               }, 500);
//             }}
//           >
//             {({ values, isSubmitting }) => (
//               <Form>
//                 <div className="question-container">
//                   <p>Select the month(s) you used this agency?</p>
//                 </div>
//                 <Question question={questions[0]} />

//                 <button type="submit" disabled={isSubmitting}>
//                   Submit your review
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </section>
//       </ReviewRapper>
//     );
//   }
// }

// export default Review;
