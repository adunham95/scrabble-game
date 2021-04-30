import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { getApolloMessage } from '../../utilities/apollo_client/client';
import { generateID } from '../../utilities/utils';
import Form from '../Form/Form';
import { FormButton } from '../Form/FormButton';
import { FormInput } from '../Form/FormInput';
import { FormHeader } from '../Form/FormText';
import styles from './gameEditor.module.scss';

const fullAlphabet = [
  {
    _id: generateID(4), letter: 'A', point: 1, weight: 9,
  },
  {
    _id: generateID(4), letter: 'B', point: 3, weight: 2,
  },
  {
    _id: generateID(4), letter: 'C', point: 3, weight: 2,
  },
  {
    _id: generateID(4), letter: 'D', point: 2, weight: 4,
  },
  {
    _id: generateID(4), letter: 'E', point: 1, weight: 12,
  },
  {
    _id: generateID(4), letter: 'F', point: 4, weight: 2,
  },
  {
    _id: generateID(4), letter: 'G', point: 2, weight: 3,
  },
  {
    _id: generateID(4), letter: 'H', point: 4, weight: 2,
  },
  {
    _id: generateID(4), letter: 'I', point: 1, weight: 9,
  },
  {
    _id: generateID(4), letter: 'J', point: 8, weight: 1,
  },
  {
    _id: generateID(4), letter: 'K', point: 5, weight: 1,
  },
  {
    _id: generateID(4), letter: 'L', point: 1, weight: 4,
  },
  {
    _id: generateID(4), letter: 'M', point: 3, weight: 2,
  },
  {
    _id: generateID(4), letter: 'N', point: 1, weight: 6,
  },
  {
    _id: generateID(4), letter: 'O', point: 1, weight: 8,
  },
  {
    _id: generateID(4), letter: 'P', point: 3, weight: 2,
  },
  {
    _id: generateID(4), letter: 'Q', point: 10, weight: 1,
  },
  {
    _id: generateID(4), letter: 'R', point: 1, weight: 6,
  },
  {
    _id: generateID(4), letter: 'S', point: 1, weight: 4,
  },
  {
    _id: generateID(4), letter: 'T', point: 1, weight: 6,
  },
  {
    _id: generateID(4), letter: 'U', point: 1, weight: 4,
  },
  {
    _id: generateID(4), letter: 'V', point: 4, weight: 2,
  },
  {
    _id: generateID(4), letter: 'W', point: 4, weight: 2,
  },
  {
    _id: generateID(4), letter: 'X', point: 8, weight: 1,
  },
  {
    _id: generateID(4), letter: 'Y', point: 4, weight: 2,
  },
  {
    _id: generateID(4), letter: 'Z', point: 10, weight: 1,
  },
];

const projectDefault = {
  _id: '', name: '', adminID: '', tiles: fullAlphabet, rounds: 0,
};

const CreateGameMutation = gql`
mutation($input:GameInput){
  createGame(input:$input){
    _id
  }
}
`;

const UpdateGameMutation = gql`
mutation($input:GameInput){
  createGame(input:$input){
    _id
  }
}
`;

const GameForm = ({
  project, onSubmit = () => {}, onCancel = () => {}, adminID = '',
}) => {
  const client = useApolloClient();
  const [createGame] = useMutation(CreateGameMutation);
  const [projectData, setProjectData] = useState(projectDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', message: '' });
  const [newTile, setNewTile] = useState({
    _id: '', letter: '', point: 0, weight: 1,
  });

  useEffect(() => {
    console.log('project', project);
    setProjectData({ ...projectDefault, ...project });
  }, [project]);

  const updateProject = (value, field) => {
    const updatedProjectData = { ...projectData };
    updatedProjectData[field] = value;
    setProjectData(updatedProjectData);
  };

  const updateNewTile = (value, field) => {
    const updatedNewTileData = { ...newTile };
    updatedNewTileData[field] = value;
    setNewTile(updatedNewTileData);
  };

  const updateTile = () => {
    const updatedProjectData = { ...projectData };
    const tileIndex = updatedProjectData.tiles.findIndex((t) => t._id === newTile._id);
    console.log('tileIndex', tileIndex);
    if (tileIndex > -1) {
      updatedProjectData.tiles[tileIndex] = { ...newTile };
    }
    if (tileIndex <= -1) {
      console.log('Add tile');
      // If Tile does not exist add tile
      if (newTile.letter === '') { return; }
      const createTile = { ...newTile, _id: generateID(4) };
      updatedProjectData.tiles.push(createTile);
    }
    setProjectData(updatedProjectData);
    setNewTile({
      _id: '', letter: '', point: 0, weight: 1,
    });
  };

  const removeTile = () => {
    const updatedProjectData = { ...projectData };
    updatedProjectData.tiles = updatedProjectData.tiles.filter((t) => t._id !== newTile._id);
    setProjectData(updatedProjectData);
  };

  const submit = async () => {
    const input = {
      adminID,
      name: projectData.name,
      rounds: 0,
      tiles: projectData.tiles.map((t) => ({ ...t })),
    };
    console.log('submitting', input);
    try {
      await client.resetStore();
      const { data } = await createGame({
        variables: {
          input,
        },
      });
      console.log(data);
      setIsLoading(false);
      setMessage({ type: 'success', message: 'Logging In' });
      onSubmit({ ...projectData, _id: data.createGame._id });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMessage({ type: 'error', message: getApolloMessage(error) });
    }
  };

  return (
    <Form
      onSubmit={submit}
      className={styles.gameForm}
    >
      <FormHeader title="Game" />
      <FormInput
        placeholder="Name"
        onChange={(t) => updateProject(t, 'name')}
        value={projectData.name}
      />
      {/* <FormInput
        placeholder="Rounds"
        type="Number"
        onChange={(t) => updateProject(t, 'rounds')}
        value={projectData.rounds}
      /> */}

      <div>
        <div className={styles.tileContainer}>
          {projectData.tiles.map((t) => (
            <span
              key={t._id}
              className={styles.tile}
            >
              <button
                aria-label="Edit Tile"
                type="button"
                className={styles.tileRemove}
                onClick={() => setNewTile(t)}
              >
                Edit
              </button>
              {t.letter}
              <span className={styles.tileWeight}>{t.weight}</span>
              <span className={styles.tileScore}>{t.point}</span>
            </span>
          ))}
          <span
            className={styles.tile}
          >
            <button
              aria-label="Add Tile"
              type="button"
              className={styles.tileRemove}
              onClick={() => setNewTile({
                _id: 'new', letter: 'A', weight: '1', point: '1',
              })}
            >
              Edit
            </button>
            +
          </span>
        </div>
        <FormInput
          placeholder="A"
          onChange={(t) => updateNewTile(t, 'letter')}
          value={newTile.letter}
        />
        <FormInput
          placeholder="10"
          type="Number"
          onChange={(t) => updateNewTile(t, 'point')}
          value={newTile.point}
        />
        <FormInput
          type="Number"
          onChange={(t) => updateNewTile(t, 'weight')}
          value={newTile.weight}
        />
        <FormButton
          type="button"
          onClick={updateTile}
        >
          {newTile._id === 'new' ? 'Add' : 'Update'}
          {' '}
          Tile
        </FormButton>
        <FormButton
          type="button"
          onClick={removeTile}
        >
          Remove Tile
        </FormButton>
      </div>

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
