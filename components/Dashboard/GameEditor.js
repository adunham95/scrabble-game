import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';
import { FormButton } from '../Form/FormButton';
import { FormInput } from '../Form/FormInput';
import { FormHeader } from '../Form/FormText';

const projectDefault = {
  _id: '', name: '', adminID: '', tiles: [], rounds: 0,
};

const GameForm = ({
  project, onSubmit = () => {}, onCancel = () => {},
}) => {
  const [projectData, setProjectData] = useState(projectDefault);

  useEffect(() => {
    console.log('project', project);
    setProjectData({ ...projectDefault, ...project });
  }, [project]);

  const updateProject = (value, field) => {
    const updatedTileData = { ...projectData };
    updatedTileData[field] = value;
    setProjectData(updatedTileData);
  };

  const submit = async () => {
    console.log('submitting');
    onSubmit();

    // await client.resetStore();

    if (projectData.id === '') {
      console.log('Create Tag');
    }
    console.log('Update Tag');
  };

  return (
    <Form onSubmit={submit}>
      <FormHeader title="Game" />
      <FormInput
        onChange={(t) => updateProject(t, 'name')}
        value={projectData.name}
      />
      <FormInput
        onChange={(t) => updateProject(t, 'points')}
        value={projectData.points}
      />
      <FormButton
        type="button"
        onClick={onCancel}
      >
        Cancel
      </FormButton>
      <FormButton type="submit">
        Save
      </FormButton>
    </Form>

  );
};
export default GameForm;
