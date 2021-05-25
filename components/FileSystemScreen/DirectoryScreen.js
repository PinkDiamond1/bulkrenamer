import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, IconButton, withTheme } from 'react-native-paper';
import * as RNFS from 'react-native-fs';

import { StoreContext, Strings, ActionTypes } from '@store/store';
import { DirectoryItems } from './DirectoryItems';


class DirectoryView extends React.Component {

  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.state = {
      listOfDirs: [],
      listOfFiles: 0,
      path: this.props?.route?.params?.path || RNFS.ExternalStorageDirectoryPath,
      fetchError: -1,
    }
  }

  /**
   * saveDirectoryPath
   * Save the path in global store and navigate back to FormView
   */
  saveDirectoryPath = () => {
    const [state, dispatch] = this.context;
    dispatch({
      type: ActionTypes.UPDATE_DIRECTORY_PATH,
      path: this.state.path.slice(RNFS.ExternalStorageDirectoryPath.length),
      listOfFiles: this.state.listOfFiles
    });
    this.props.navigation.navigate('HomeView');
  }


  /**
   * componentDidMount
   * On Component mount, set the header buttons and fetch the directory entries
   */
  componentDidMount() {
    this.props.navigation.setOptions({
      title: (this.props.route?.params?.path.split('/').slice(-1)[0] || 'Root Directory'),
      headerRight: ({ tintColor }) => (
        <IconButton icon='content-save' color={tintColor} onPress={this.saveDirectoryPath} />
      )
    });
    
    this.fetchDirectoryEntries();
  }


  /**
   * fetchDirectoryEntries
   * Read the directories and update the class state
   */
  fetchDirectoryEntries = async() => {

    let listOfItems = [], error = null;
    try {
      listOfItems = await RNFS.readDir(this.state.path);
    } catch (err) {
      error = Strings.FAILED_TO_LOAD_DIR;
    } finally {
      this.setState({
        ...this.state,
        ...this.formatDirectoryEntries(listOfItems),
        fetchError: error,
      });
    }
  }


  /**
   * Sort the list and move the files before directories in array
   * @param {Array} listOfItems is the original list of items to be sorted, etc.
   * @returns sorted list based on isDirectory status, and list of files
   */
  formatDirectoryEntries = (listOfItems) => {
    const documents = listOfItems
      .filter(item => (item.name[0] !== '.' && item.isFile()));

    const directories = listOfItems
      .filter(item => (item.name[0] !== '.' && item.isDirectory()))
      .sort((A, B) => A.name.toLowerCase() > B.name.toLowerCase());

    return { listOfDirs: directories, listOfFiles: documents };
  }


  /**
   * navigateToDirectory
   * @param {String} path to the directory to be navigated to
   */
  navigateToDirectory = (path) => {
    this.props.navigation.push('DirectoryView', { path: path })
  }


  /**
   * render
   * @returns JSX to be rendered
   */
  render() {

    const containerStyle = () => (
      this.state.fetchError
        ? {
          ...this.theme.styles.container,
          justifyContent: 'center',
          backgroundColor: this.theme.colors.background
        } : {
          flex: 1,
          backgroundColor: this.theme.colors.background
        }
    );

    const getContent = () => (
      this.state.fetchError
        ? (
          this.state.fetchError === -1
            ? <Button loading mode='text' color={this.theme.colors.primary} />
            : <Text theme={this.theme}>{this.state.fetchError}</Text>
        ) : (
          <DirectoryItems
            theme={this.theme}
            data={this.state.listOfDirs}
            countOfFiles={this.state.listOfFiles.length}
            onNavigate={this.navigateToDirectory} />
        )
    );

    return <SafeAreaView style={containerStyle()}>{getContent()}</SafeAreaView>
  }
}

export const DirectoryScreen = withTheme(DirectoryView);