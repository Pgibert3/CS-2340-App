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
    PRIMARY_BLUE: '#1A0083',
    SECONDARY_BLUE: '#24374F',
    OLD_GOLD: '#6B6132',
    NEW_GOLD: '#D6A145',
    PALE_WHITE: '#E4F0D0'
}

//Spacing
const DEFAULT_SPACING = {
    MARGIN_HORIZONTAL: 10,
    MARGIN_VERTICAL: 10,
    PADDING_HORIZONTAL: 20,
    PADDING_VERTICAL: 10
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
        marginHorizontal: DEFAULT_SPACING.MARGIN_HORIZONTAL
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
        backgroundColor: COLORS.PRIMARY_BLUE,
    },
    title: {
        color: COLORS.PALE_WHITE,
    }
});

/**
 *Styling for default TextInput
 *input: main body of text input
 */
export const FORM_TEXT_INPUT_STYLES = StyleSheet.create({
    title: {
        color: COLORS.NEW_GOLD,
        fontSize: 24,
        fontWeight: '400',
    },
    inputField: {
        fontSize: 18
    }
});
