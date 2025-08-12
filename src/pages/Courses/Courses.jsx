import './Courses.scss'
import FramePage from '~/components/FramePage/FramePage'
import ListCourses from '~/components/ListCourses/ListCourses'

export default function Courses() {
    return (
        <FramePage>
        <div className="courses">
            <ListCourses/>
        </div>
        </FramePage>
    )
}