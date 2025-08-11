// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Test = lazy(() =>
  import("../components/TestComponent/TestComponent").then((module) => ({
    default: module.TestComponent,
  }))
);
const NotFoundPage = React.lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Introduce = lazy(() => import("../pages/Introduce/Introduce"));
const TeachingStaff = lazy(() =>
  import("../pages/TeachingStaff/TeachingStaff")
);
const Exams = lazy(() => import("../pages/Exams/Exams"));
const Courses = lazy(() => import("../pages/Courses/Courses"));
const Login = lazy(() => import("../pages/Login/Login"));
const Tutorials = lazy(() => import("../pages/Tutorials/Tutorials"));
const ProfileTeacher = lazy(() =>
  import("../pages/ProfileTeacher/ProfileTeacher")
);
const ClassDetails = lazy(() => import("../pages/ClassDetails/ClassDetails"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));

// Admin
const CreateClass = lazy(() =>
  import("../pages/admin/CreateClass/CreateClass")
);
const EditClass = lazy(() => import("../pages/admin/EditClass/EditClass"));
const AddBook = lazy(() => import("../pages/admin/AddBook/AddBook"));
const EditBook = lazy(() => import("../pages/admin/EditBook/EditBook"));
const ListClasses = lazy(() =>
  import("../pages/admin/ListClasses/ListClasses")
);
const CreateTeacher = lazy(() =>
  import("../pages/admin/CreateTeacher/CreateTeacher")
);

//Teacher
const CreateExam = lazy(() => import("../pages/teacher/CreateExam/CreateExam"));
const MyClassTeacher = lazy(() =>
  import("../pages/teacher/MyClassTeacher/MyClassTeacher")
);
const ClassDetailPage = lazy(() => import("../pages/teacher/ClassDetailPage/ClassDetailPage"));
const ChapterDetailsPage = lazy(() => import("../pages/teacher/ChapterDetailsPage/ChapterDetailsPage"));
const ListExamTeacherPage = lazy(() => import("../pages/teacher/ListExamTeacherPage/ListExamTeacherPage"));

//Student
const TestDetailPage = lazy(() =>
  import("../pages/TestDetailPage/TestDetailPage")
);
const HomeworkPage = lazy(() =>
  import("../pages/student/HomeworkPage/HomeworkPage")
);
const ExamDetailsPage = lazy(() =>
  import("../pages/student/ExamDetailsPage/ExamDetailsPage")
);
const MyClassStudent = lazy(() =>
  import("../pages/student/MyClassStudent/MyClassStudent")
);
const MyClassDetail = lazy(() =>
  import("../pages/student/MyClassDetail/MyClassDetail")
);
const BookDetail = lazy(() => import("../pages/student/BookDetail/BookDetail"));

const TestResultsPage = lazy(() =>
  import("../pages/student/TestResultsPage/TestResultsPage")
);

//Account
const EditProfilePage = lazy(() =>
  import("../pages/EditProfilePage/EditProfilePage")
);
const ChangePasswordPage = lazy(() =>
  import("../pages/ChangePasswordPage/ChangePasswordPage")
);

const Auth = () => {
  const roleLogin = useSelector((state) => state.account.info?.role);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div></div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/gioi-thieu"
        element={
          <Suspense fallback={<div></div>}>
            <Introduce />
          </Suspense>
        }
      />
      <Route
        path="/teaching-staff"
        element={
          <Suspense fallback={<div></div>}>
            <TeachingStaff />
          </Suspense>
        }
      />
      <Route
        path="/exams"
        element={
          <Suspense fallback={<div></div>}>
            <Exams />
          </Suspense>
        }
      />
      <Route
        path="/courses"
        element={
          <Suspense fallback={<div></div>}>
            <Courses />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div></div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Suspense fallback={<div></div>}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="/tutorials"
        element={
          <Suspense fallback={<div></div>}>
            <Tutorials />
          </Suspense>
        }
      />
      <Route
        path="/teaching-staff/:id"
        element={
          <Suspense fallback={<div></div>}>
            <ProfileTeacher />
          </Suspense>
        }
      />
      <Route
        path="/courses/:classId"
        element={
          <Suspense fallback={<div></div>}>
            <ClassDetails />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense>
            <NotFoundPage />
          </Suspense>
        }
      />
      {roleLogin && (
        <>
          <Route
            path="/edit-profile"
            element={
              <Suspense fallback={<div></div>}>
                <EditProfilePage />
              </Suspense>
            }
          />
          <Route
            path="/change-password"
            element={
              <Suspense fallback={<div></div>}>
                <ChangePasswordPage />
              </Suspense>
            }
          />
        </>
      )}
      {roleLogin === "ADMIN" && (
        <>
          <Route
            path="/admin/create-class"
            element={
              <Suspense fallback={<div></div>}>
                <CreateClass />
              </Suspense>
            }
          />

          <Route
            path="/admin/add-book/:classId"
            element={
              <Suspense fallback={<div></div>}>
                <AddBook />
              </Suspense>
            }
          />
          <Route
            path="/admin/create-teacher"
            element={
              <Suspense fallback={<div></div>}>
                <CreateTeacher />
              </Suspense>
            }
          />
        </>
      )}
      {roleLogin === "TEACHER" && (
        <>
          <Route
            path="my-class-teacher/:classId/edit-test/:examId" 
            element={
              <Suspense fallback={<div></div>}>
                <CreateExam />
              </Suspense>
            }
          />
           <Route
            path="my-class-teacher/:classId/create-test" 
            element={
              <Suspense fallback={<div></div>}>
                <CreateExam />
              </Suspense>
            }
          />
          <Route
            path="/my-class-teacher"
            element={
              <Suspense fallback={<div></div>}>
                <MyClassTeacher />
              </Suspense>
            }
          />
          <Route
            path="/test-management"
            element={
              <Suspense fallback={<div></div>}>
                <ListExamTeacherPage />
              </Suspense>
            }/>
        </>
      )}
      {(roleLogin === "TEACHER" || roleLogin === "ADMIN") && (
        <>
          <Route
            path="/list-classes"
            element={
              <Suspense >
                <ListClasses />
              </Suspense>
            }
          />
          <Route
            path="/edit-class/:classId"
            element={
              <Suspense>
                <EditClass />
              </Suspense>
            }
          />
          <Route
            path="/edit-book/:classId/:bookId"
            element={
              <Suspense fallback={<div></div>}>
                <EditBook />
              </Suspense>
            }
          />
          <Route
            path="/my-class-teacher/:classId"
            element={
              <Suspense fallback={<div></div>}>
                <ClassDetailPage />
              </Suspense>
            }/>
          <Route
            path="/edit-book/edit-chapter/:chapterId"
            element={
              <Suspense fallback={<div></div>}>
                <ChapterDetailsPage />
              </Suspense>
            }/>
        </>
      )}
      {roleLogin === "STUDENT" && (
        <>
          <Route
            path="/test-detail/:examID"
            element={
              <Suspense fallback={<div></div>}>
                <TestDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/homework"
            element={
              <Suspense fallback={<div></div>}>
                <HomeworkPage />
              </Suspense>
            }
          />
          <Route
            path="/exam/:examId"
            element={
              <Suspense fallback={<div></div>}>
                <ExamDetailsPage />
              </Suspense>
            }
          />

          <Route
            path="/my-class"
            element={
              <Suspense fallback={<div></div>}>
                <MyClassDetail />
              </Suspense>
            }
          />
          <Route
            path="/my-class/:bookId"
            element={
              <Suspense fallback={<div></div>}>
                <BookDetail />
              </Suspense>
            }
          />
          <Route
            path="/test-results/:testId"
            element={
              <Suspense fallback={<div></div>}>
                <TestResultsPage />
              </Suspense>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default Auth;
