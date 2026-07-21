import { useEffect, memo } from 'react';
import useStore from './store';


//global sectionID counter 
let sectionIDcounter = 1000; 
let courseIDcounter = 100;


function Section(props) {
  console.log(`Section ${props.section.id} being redrawn`);
  
  // Get actions from store
  const updateSectionAction = useStore(state => state.updateSection);
  const deleteSectionAction = useStore(state => state.deleteSection);

  const handleInstuctChange = (e) => {
    //to update section's prof id in main state 
    const newInstID = parseInt(e.target.value, 10);
    console.log(`section id: ${props.section.id} changing instructor to: ${newInstID}`);

    // Call store action directly
    updateSectionAction(props.section.id, newInstID);
  }

  const handleDeleteClick = () => {
    // Call store action directly
    deleteSectionAction(props.section.id);
  }

  const allInstructorOptions = props.instructors.map(instructor =>
    <option key={instructor.id} value={instructor.id}>
      {instructor.name}
    </option>
  );

  return (
    <>
      <div className="col-auto">
        <div className="input-group">
          <select className="form-select"
            value={props.section.instructor}
            onChange={handleInstuctChange}>
            {allInstructorOptions}
          </select>
          <button className="btn btn-danger" onClick={handleDeleteClick}>-</button>
        </div>
      </div>
    </>
  );
}


//typically would do this in diff file (components file) 
const Course = memo(function Course(props) {
  console.log(`Course ${props.course.name} being redrawn`);

  // Get action from store (only addSection, since Section handles its own actions)
  const addSectionAction = useStore(state => state.addSection);

  // Sections now come from props.course (which is from the store)
  const sections = props.course.sections;

  console.log(sections);

  //handler to add section
  const addSection = async (e) => {
    console.log("adding section w/ instructor " + e.target.value);

    //which instructor did they choose...
    const selectedInst = parseInt(e.target.value, 10);

    // Call the store action
    await addSectionAction(props.course.id, selectedInst);

    //reset dropDown - since the option uses instruct id as the select value, set it back 
    e.target.value = -1;
  };

  const allInstructorOptions = props.instructors.map(instructor =>
    <option key={instructor.id} value={instructor.id}>
      {instructor.name}
    </option>
  );

  //view 
  return (
    <tr>
      <th scope="row">{props.course.name}</th>
      <td>
        <div className="row g-2">
          {sections.map(section =>
            <Section
              key={section.id}
              section={section}
              instructors={props.instructors} />
          )}

          <div className="col-auto">
            <select className="form-select" defaultValue="-1" onChange={addSection}>
              <option disabled value="-1">Add Section...</option>
              {allInstructorOptions}
            </select>
          </div>
        </div>
      </td>
    </tr>
  );

});

function App() {

  console.log("App being redrawn");

  //app states 
  const instructors = useStore(state => state.instructors);
  const courses = useStore(state => state.courses);
  const error = useStore(state => state.error);
  const loading = useStore(state => state.loading);


  //our actions 
  const retrieveData = useStore(state => state.retrieveData);
  const addCourse = useStore(state => state.addCourse);

  //most common use of UseEffect is do this after all component is done 
  useEffect(() => { //this func. returns a promise bc its async (not a prob)
    console.log('Running app effect');
    retrieveData();
  }, []);


  //probs good practice loading/err state 
  if (loading) return <div className="container"><h1>Loading...</h1></div>;
  if (error) return <div className="container"><h1>{error}</h1></div>;


  return (
    <>
      <div className="container">

        <h1 className="my-4">Build-A-Schedule</h1>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Sections</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <Course key={course.id} course={course} instructors={instructors} />
            )}
          </tbody>
        </table>

        <div className="row">
          <div className="col-auto">
            <div className="input-group mb-3">
              <form onSubmit={addCourse}>
                <input type="text" className="form-control" placeholder="Course ID (e.g., 4001)" />
                <button type="submit" className="btn btn-primary" id="button-addon2">Add Course</button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </>
  );

}

export default App