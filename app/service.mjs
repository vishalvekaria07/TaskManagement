import TaskModel from './domain/task'
import profileModel from './domain/profiles'


async function createTask(request, response) {
  const modelToPersist = await new TaskModel(request.body);
  const result = await modelToPersist.save()
  if(result) {
    response.status(200).send({message: "Data inserted successfully" })
  } else {
    response.status(500).send({message: "some error occured" })
  }

}

async function getTask(request, response){
  const { username, password } = request.headers
  //for login user should pass valid cred into header
  if (username === "admin" && password ==="admin123" ) {
    try{
      const taskData = await TaskModel.find().sort( { StartTime: -1 } ).lean().exec();
      response.send(taskData);
  } catch (error) {
      return {error:error.message};
    }
  }
  else{
    response.status(404).send({message: "Invalid Credentials" })
  }
    
}

async function getTaskByName(request, response) {
  const {name} = request.query
    const result = await TaskModel.findOne(
      { "taskName": name }
    );
  
    if(result) {
      response.send(result);
    } else {
      response.status(404).send({message: "No record Found" })
    }  
}

async function getTaskByDate(request, response) {
  const {StartTime, EndTime} = request.query

    const result = await TaskModel.find(
      { "StartTime":  {$gte: StartTime, $lte: EndTime} }
    ).select({ taskName: 1, description: 1, Status: 1 });

    if(result) {
      response.send(result);
    } else {
      response.status(404).send({message: "No record Found" })
    }  
}

async function deleteTask(request, response) {

  const id = request.params.task_id;
  const result = await TaskModel.findOneAndDelete({ _id: id })
  if(result) {
    response.send({message: " record Deleted" });
  } else {
    response.status(404).send({message: "No record Found" })
  }
}

async function updateTask(request, response) {
  try{
    const id = request.params.task_id;
    const dataToUpdate = request.body
    console.log(dataToUpdate);
    const result = await TaskModel.findByIdAndUpdate({ _id: id },  dataToUpdate, { new: true }).lean().exec();
    if(result) {
      response.status(200).send({message: "Data updated successfully" })
    } else {
      response.status(500).send({message: "some error occured" })
    }
  } catch(error){
console.log(error)
  }
  }
  

  async function randomProfile(request, response) {
    console.log("in profile method")
 
    var max = 100
    var min = 1

    const a = [];
       for(let i=1;i<50;i++)
       {
         var data = {
           "name" : `name${i}`,
           "age" : i,
           "level" : Math.floor(Math.random() * (+max - +min)) + +min
         }
         a.push(data)      
       }
       const result = await profileModel.insertMany(a);
       if(result) {
        response.status(200).send({message: "Data inserted successfully" })
      } else {
        response.status(500).send({message: "some error occured" })
      }
      
  }

  async function getProfiledata(request, response) {
    
      const selfPlayer = await profileModel.findOne();//to find random player
      const topNinePlayer = await profileModel.aggregate([{$sort: {level: 1}}, {$limit: 9}]);
      //const fres = Object.assign( result, selfPlayer)
  const result = {topNinePlayer, selfPlayer}
      if(selfPlayer && topNinePlayer) {
        response.send(result);
      } else {
        response.status(404).send({message: "No record Found" })
      }  
  }

export {
  createTask,
  getTaskByName,
  deleteTask,
  updateTask,
  getTask,
  randomProfile,
  getTaskByDate,
  getProfiledata
}

