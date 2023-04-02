import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity
} from 'react-native';
import { 
  primaryHexColor, 
  dangerHexColor, 
  formComponentBorder, 
  placeHolderColor, 
  fontColor,
  seperator
} from '../constants/themeColors';

const TeethSkeleton = ({
    isClickable,
    selectedTooths,
    handleToothNumberChange,
    errors,
    ...rest
}) => (
    <View style={styles.container}>
        <View style={styles.toothContainer}>
            <View 
                style={[
                    styles.toothPositionBlock,
                    styles.topLeftBlock
                ]}
            >
                <View style={styles.topLeftContainer}>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(1);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(1) ? styles.selectedItemText : styles.itemText}
                        >
                            8
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(2);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(2) ? styles.selectedItemText : styles.itemText}
                        >
                            7
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(3);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(3) ? styles.selectedItemText : styles.itemText}
                        >
                            6
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(4);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(4) ? styles.selectedItemText : styles.itemText}
                        >
                            5
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(5);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(5) ? styles.selectedItemText : styles.itemText}
                        >
                            4
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(6);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(6) ? styles.selectedItemText : styles.itemText}
                        >
                            3
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(7);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(7) ? styles.selectedItemText : styles.itemText}
                        >
                            2
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(8);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(8) ? styles.selectedItemText : styles.itemText}
                        >
                            1
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View 
                style={[
                    styles.toothPositionBlock, 
                    styles.topRightBlock
                ]}
            >
                <View style={styles.topRightContainer}>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(9);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(9) ? styles.selectedItemText : styles.itemText}
                        >
                            1
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(10);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(10) ? styles.selectedItemText : styles.itemText}
                        >
                            2
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(11);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(11) ? styles.selectedItemText : styles.itemText}
                        >
                            3
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(12);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(12) ? styles.selectedItemText : styles.itemText}
                        >
                            4
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(13);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(13) ? styles.selectedItemText : styles.itemText}
                        >
                            5
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(14);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(14) ? styles.selectedItemText : styles.itemText}
                        >
                            6
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(15);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(15) ? styles.selectedItemText : styles.itemText}
                        >
                            7
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(16);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(16) ? styles.selectedItemText : styles.itemText}
                        >
                            8
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View 
                style={[
                    styles.toothPositionBlock, 
                    styles.bottomLeftBlock
                ]}
            >
                <View style={styles.bottomLeftContainer}>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(17);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(17) ? styles.selectedItemText : styles.itemText}
                        >
                            8
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(18);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(18) ? styles.selectedItemText : styles.itemText}
                        >
                            7
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(19);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(19) ? styles.selectedItemText : styles.itemText}
                        >
                            6
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(20);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(20) ? styles.selectedItemText : styles.itemText}
                        >
                            5
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(21);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(21) ? styles.selectedItemText : styles.itemText}
                        >
                            4
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(22);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(22) ? styles.selectedItemText : styles.itemText}
                        >
                            3
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(23);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(23) ? styles.selectedItemText : styles.itemText}
                        >
                            2
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(24);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(24) ? styles.selectedItemText : styles.itemText}
                        >
                            1
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View 
                style={[
                    styles.toothPositionBlock, 
                    styles.bottomRightBlock
                ]}
            >
                <View style={styles.bottomRightContainer}>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(25);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(25) ? styles.selectedItemText : styles.itemText}
                        >
                            1
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(26);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(26) ? styles.selectedItemText : styles.itemText}
                        >
                            2
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(27);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(27) ? styles.selectedItemText : styles.itemText}
                        >
                            3
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(28);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(28) ? styles.selectedItemText : styles.itemText}
                        >
                            4
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(29);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(29) ? styles.selectedItemText : styles.itemText}
                        >
                            5
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(30);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(30) ? styles.selectedItemText : styles.itemText}
                        >
                            6
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(31);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(31) ? styles.selectedItemText : styles.itemText}
                        >
                            7
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={(typeof isClickable === 'undefined' || (typeof isClickable !== 'undefined' && isClickable)) ? 0.2 : 1}
                        onPress={() => {
                            handleToothNumberChange(32);
                        }}
                    >
                        <Text 
                            style={selectedTooths.includes(32) ? styles.selectedItemText : styles.itemText}
                        >
                            8
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {typeof errors !== 'undefined' && errors !== null && errors !== '' ?
            <View style={styles.errorContainer}>
                <Text style={styles.error} >
                    {errors}
                </Text>
            </View>
            : null
        }
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 12,
        marginBottom: 0,
    },
    toothContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    errorContainer: {
        marginHorizontal: 4,
    },
    error: {
        fontSize: 10,
        color: dangerHexColor,
        marginBottom: 2
    },
    toothPositionBlock: {
        width: '50%',
        borderColor: seperator,
        padding: 4,
        flexDirection: 'row'
    },
    topLeftBlock: { 
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    topRightBlock: { 
        borderBottomWidth: 1,
        borderLeftWidth: 1,
    },
    bottomLeftBlock: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        marginTop: -1,
    },
    bottomRightBlock: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        marginTop: -1
    },
    topLeftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    topRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bottomLeftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    bottomRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemText: {
        margin: 2,
        paddingVertical: 0,
        paddingLeft: 5,
        paddingRight: 3,
        fontSize: 13,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10  
    },
    selectedItemText: {
        margin: 2,
        paddingVertical: 0,
        paddingLeft: 5,
        paddingRight: 3,
        fontSize: 13,
        borderWidth: 1,
        borderColor: primaryHexColor,
        borderRadius: 10  
    }
})

export default TeethSkeleton