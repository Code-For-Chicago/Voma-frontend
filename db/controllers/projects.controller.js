const { models } = require('../index');
const { addTimeslots, editTimeslot, deleteTimeslot } = require('./timeslots.controller')

const getProjects = async (req, res) => {
    let error;
    const projects = await models.project.findAll({
        include: [{
            model: models.Timeslot
        }, {
            model: models.Link
        }]
    })
                    .catch(err => error = err);
    
    if (error) {
        return res.status(400).json({ error });
    }

    res.json(projects);
};

const getProject = async (req, res) => {
    let error;
    const project = await models.project.findOne({
        where: {
          id: req.params.id
        },
        include: [{
            model: models.Timeslot
        }, {
            model: models.Link
        }]})
                          .catch(err => error = err);
                    
    if (error) {
        return res.status(400).json({ error });
    }

    if (project) {
        res.json(project);
    } else {
        res.status(400).json({ error: `Project ${req.params.id} does not exist.` });
    }
};

const addProject = async (req, res) => {
    let error;
    const { 
        name,
        description
    } = req.body;

    const result = await models.project.create({
        name,
        description
    })
    .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json({ result: `Project ${result.id} has been added to the database.` });
};

const processTimeslots = async (newTimeslots, currTimeslots, projectId) => {
    const newSlots = [];

    const toDelete = currTimeslots.filter((slot) => {
        return !newTimeslots.find((newSlot) => newSlot.id == slot.dataValues.id);
    });
   
    newTimeslots.forEach((slot) => {
        if (!currTimeslots.find(oldSlot => oldSlot.dataValues.id === slot.id)) {
            newSlots.push({...slot, id: null }); // new slots contain a randomly generated id that will throw an error if not removed
        } else {
            editTimeslot(slot);
        }
    });

    if (newSlots.length > 0) {
        addTimeslots(newSlots, null, projectId);
    }
    if (toDelete.length > 0) {
        toDelete.forEach(slot => deleteTimeslot(slot.id));
    }
}

const editProject = async (req, res) => {
    let findError, updateError;
    
    const project = await models.project.findOne({where: {
        id: req.params.id
      },
      include: [{
          model: models.Timeslot
      }]})
                    .catch(err => findError = err);
    
    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (project) {
        processTimeslots(req.body.Timeslots, project.Timeslots, project.id);
        const result = await project.update(req.body)
                             .catch(err => updateError = err);
        

        if (updateError) {
            return res.status(400).json({ error: updateError });
        }
        
        res.json({ result: `Project ${req.params.id} has been updated`});
    } else {
        return res.status(404).json({ error: `Project ${req.params.id} does not exist.`});
    }
};

const removeProject = async (req, res) => {
    let findError, deleteError;

    const project = await models.project.findByPk(req.params.id)
                            .catch(err => findError = err);
    
    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (project) {
        await project.destroy()
        .catch(err => deleteError = err);
        
        if (deleteError) {
            return res.status(400).json({ error: deleteError });
        }
        
        res.status(200).json({ result: `Project ${req.params.id} has been removed.`});
    } else {
        res.status(404).json({ result: `Project ${req.params.id} does not exist.`});
    }
};


module.exports = {
    getProjects,
    getProject, 
    addProject,
    editProject,
    removeProject
};
