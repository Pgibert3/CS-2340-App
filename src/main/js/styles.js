/*Default styles of the Donatrix
references for react native style props
View: https://facebook.github.io/react-native/docs/view-style-props
Text: https://facebook.github.io/react-native/docs/text#style
TextInput: https://facebook.github.io/react-native/docs/textinput
FlexBox https://facebook.github.io/react-native/docs/layout-props#flex
*/

import {StyleSheet} from 'react-native';

//Colors
const COLORS = {
    PRIMARY_1: '#1A0083',
    PRIMARY_2: '#24374F',
    SECONDARY_1: '#6B6132',
    SECONDARY_2: '#D6A145',
    WHITE: '#E4F0D0',
}

//Spacing
const DEFAULT_SPACING = {
    MARGIN_HORIZONTAL: 10,
    MARGIN_VERTICAL: 10,
    PADDING_HORIZONTAL: 20,
    PADDING_VERTICAL: 10,
}

/**
 * Stlying for Views
 * defaultColumn: General styling for column Views
 * defaultRow: General styling for row Views
 */
export const VIEW_STYLES = StyleSheet.create({
    defaultColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    defaultRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    formElement: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: DEFAULT_SPACING.MARGIN_VERTICAL,
        paddingHorizontal: DEFAULT_SPACING.MARGIN_HORIZONTAL,
        width: '100%'
    }

});

/**
 * Styling for the default button
 * button: main body of button
 * title: text of the button
 */
export const BUTTON_STYLES = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: DEFAULT_SPACING.MARGIN_VERTICAL,
        marginHorizontal: DEFAULT_SPACING.MARGIN_HORIZONTAL,
        width: 100,
        height: 45,
        backgroundColor: COLORS.PRIMARY_1,
    },
    title: {
        color: COLORS.WHITE,
    }
});

/**
 * Styling for default FormTextInput
 * title: The title of the field
 * inputField: the styling of the native TextInput
 */
export const FORM_TEXT_INPUT_STYLES = StyleSheet.create({
    title: {
        color: COLORS.SECONDARY_2,
        fontSize: 24,
    },
    inputField: {
        fontSize: 18,
        borderColor: 'green',
        borderWidth: 2,
        width: '100%'
    }
});

/**
 * Styling for various texts
 * header1: The largest standard heading
 * header2: A large heading
 */
 export const TEXT_STYLES = StyleSheet.create({
    header1: {
        color: COLORS.PRIMARY_1,
        fontSize: 26,
        marginVertical: DEFAULT_SPACING.MARGIN_VERTICAL,
        marginHorizontal: DEFAULT_SPACING.MARGIN_HORIZONTAL,
    },
    header2: {
      color: COLORS.PRIMARY_1,
      fontSize: 18,
      marginVertical: DEFAULT_SPACING.MARGIN_VERTICAL,
      marginHorizontal: DEFAULT_SPACING.MARGIN_HORIZONTAL,
    }
 });
