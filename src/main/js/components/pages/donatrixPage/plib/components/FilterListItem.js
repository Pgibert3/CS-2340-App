import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import IconButton from './IconButton';
import CheckBox from './CheckBox';

/**
 * A list item that displays an checkbox on the left and arrow on thr right in
 * addition to a title left aligned. NOTE that the title prop of a FilterItem
 * serves as its unique id
 *
 * @prop title -- title and unique id of the filter (required string)
 * @prop checked -- Initial value of the checkbox. (optional bool; default: true)
 * @prop hideArrow -- Hides the arrow if true. (optional bool; default: false)
 * @prop onCheckPress -- Callback for checkbox press (optional func; default: null)
 * @prop onArrowPress -- Callback for arrow press (optional func; default: null)
 * @prop titleStyle -- Additional filter title styling (optional object; default: {})
 */
export default class FilterListItem extends Component {
     constructor(props) {
         super(props);

         this.state = {
             /* state of the checkbox (bool) */
             checked : this.props.checked,
             /* state of the arrows visibility (bool) */
             hideArrow : this.props.hideArrow,
         }

         this.onCheckPress = this.onCheckPress.bind(this);
         this.onArrowPress = this.onArrowPress.bind(this);
     }

     render() {
         return(
             <View style={styles.container}>
                 <CheckBox
                         onCheckPress={this.onCheckPress}
                 />

                 <Text style={[
                             styles.title,
                             this.props.titleStyle
                 ]}
                 >{this.props.title}</Text>

                 {(this.state.hideArrow) ? <View /> :
                     <IconButton
                             name="arrow-right"
                             onPress={this.onArrowPress}
                     />
                 }
             </View>
         );
     }

     /**
      * Called when the checkbox is pressed
      * Toggles checked state and calls passed in onCheckPress
      */
      onCheckPress() {
          this.setState((prevState, props) => ({
              checked : !prevState.checked,
          }));
          this.props.onCheckPress(this.props.title);
      }

      /**
       * Called when arrow is pressed
       * Calls passed in onArrowPress
       */
       onArrowPress() {
           this.props.onArrowPress(this.props.title);
       }
 }

FilterListItem.propTypes = {
    /* title and unique id of the filter (required string) */
    title : PropTypes.string.isRequired,
    /* Initial value of the checkbox. (optional bool; default: true) */
    checked : PropTypes.bool,
    /* Hides the arrow if true. (optional bool; default: false) */
    hideArrow : PropTypes.bool,
    /** Callback for checkbox press (optional func; default: null) */
    onCheckPress : PropTypes.func,
    /* Callback for arrow press (optional func; default: null) */
    onArrowPress : PropTypes.func,
    /* Additional filter title styling (optional object; default: {}) */
    titleStyle : PropTypes.object,
 }

FilterListItem.defaultProps = {
     checked : false,
     hideArrow : false,
     onCheckPress : () => null,
     onArrowPress : () => null,
     onTitlePress : () => null,
     titleStyle : {},
 }

const styles = StyleSheet.create({
     /* styling of the parent View */
     container : {
         flexDirection : 'row',
     },
     /* styling of the filter title */
     title : {
         flexGrow : 1,
     },
 });
