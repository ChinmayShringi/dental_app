import {
    StyleSheet,
    Platform,
    StatusBar,
    Dimensions
} from 'react-native';

import { 
    backgroundGrey,
    primaryHexColor,
    seperator,
    textMutedColor,
    primaryBlueHexColor,
    fontColor,
    circleBgColor,
    mainBgColor,
    primarywhiteHexColor
} from '../constants/themeColors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const headerStyles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
        // justifyContent: 'center',
        position: 'relative',
    },
    headerWithLogo: {
        width: '100%',
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 18,
        color: fontColor,
        // letterSpacing: 0.5,
        marginLeft: 60,
        textTransform: 'uppercase',
    },
    headertextwithbackbutton: {
        fontWeight: 'bold',
        fontSize: 18,
        color: fontColor,
        // letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    headerMenuicon: {
        position: 'absolute',
        left: 16
    }
});


const common = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
    },
    listingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        // backgroundColor: backgroundGrey,
        marginTop: 15,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15
    },
    formContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: backgroundGrey,

        paddingTop: 12,
        marginTop: 15,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        overflow: 'hidden'
    },
    formElementsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        // margin: 12,
        // padding: 5,
        paddingTop: 12,
        paddingHorizontal: 10,
        // borderRadius: 8,
        fontSize: 16,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,  
        // elevation: 5,

        
    },
    cardContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        // backgroundColor: backgroundGrey,
        paddingTop: 12,
        marginTop: 15,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        color: '#333',
        margin: 10,
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    primary: {
        color:'#000'
    },
    primary: {
        color:'#000'
    },
    error: {
        backgroundColor:'red'
    },
    success: {
        backgroundColor:'green'
    },
    inputError: {
        borderColor: '#ff0000',
    },
    fontBold: {
        fontWeight: 'bold'
    },
    bagdeText: {
        color: '#fff',
        fontSize: 12
    },
    bagdeTextXs: {
        color: '#fff',
        fontSize: 10
    },
    footerLoaderForLoadMore: {
        marginTop: 10,
        alignItems: "center"
    },
    mutedText: {
        color: textMutedColor,
    },
    mutedTextInItalic: {
        color: textMutedColor,
        fontStyle: 'italic'
    },
    seperator: {
        flex: 1,
        borderBottomColor: seperator,
        borderBottomWidth: 0.8,
        marginTop: 10,
        marginBottom: 10
    },
    linkText: {
        color: primaryHexColor
    }
});


const login = StyleSheet.create({
    imageBg: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    formwrap: {
        height: 325,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginTop: 220
    },
    inputBox: {
        width: 270,
        borderWidth: 1,
        borderColor: '#d7d7d7',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        color: '#303030',
        marginVertical: 10
    },
    button: {
        width: 270,
        backgroundColor: '#c62179',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    logoText: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18,
        color: '#1c313a',
    },
    signupTextCont: {
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }
});

const badgeCss = (label) => {
    switch (label) {
        case "success": 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#3e884f'
            }
        case "danger": 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#c43d4b'
            }
        case "warning": 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#b69329'
            }
        case "info": 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#3195a5'
            }
        case "maroon": 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#d81b60',
            }
        default: 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#3195a5'   
            }
    }
}

const badgeCssXs = (label) => {
    switch (label) {
        case "success": 
            return {
                height: 18,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#3e884f'
            }
        case "danger": 
            return {
                height: 18,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#c43d4b'
            }
        case "warning": 
            return {
                height: 18,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#b69329'
            }
        case "info": 
            return {
                height: 18,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#3195a5'
            }
        case "maroon": 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#d81b60',
            }
        default: 
            return {
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: '#3195a5'   
            }
    }
}

const badgeColorCode = (label) => {
    switch (label) {
        case "success": 
            return {
                fontWeight: 'bold',
                color: '#3e884f'
            }
        case "danger": 
            return {
                fontWeight: 'bold',
                color: '#c43d4b'
            }
        case "warning": 
            return {
                fontWeight: 'bold',
                color: '#b69329'
            }
        case "info": 
            return {
                fontWeight: 'bold',
                color: '#3195a5'
            }
        case "maroon": 
            return {
                fontWeight: 'bold',
                color: '#d81b60',
            }
        default: 
            return {
                fontWeight: 'bold',
                color: '#3195a5'   
            }
    }
}

const callLogCardLayout = StyleSheet.create({
    cardContainer: {
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 8
    },
    cardHeader: {
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingBottom: 5,
    },
    cardBody: {
        backgroundColor: '#fff',
        paddingTop: 0, 
        paddingBottom: 0
    },
    cardBodyWithOutHeader: {
        backgroundColor: '#fff',
        paddingBottom: 0
    },
    cardBodyWithOutFooter: {
        backgroundColor: '#fff',
        paddingTop: 0
    },
    cardBodyWithOutHeaderFooter: {
        backgroundColor: '#fff',
    },
    cardFooter: {
        backgroundColor: '#fff',
    },
    footerBadgeContainer: {
        flex: 1, 
        flexDirection: "row"
    },
    bodyTitle: {
        fontSize: 14,
        fontWeight: "bold",
        // color: primaryHexColor,
        color: fontColor,
        textTransform: "capitalize"
    },
    textWithIconContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        position: 'relative',
        marginTop: 2
    },
    textWithIconContainerIcon: {
        position: 'absolute',
        left: -1,
        width: 18,
        textAlign: 'center',
        color: circleBgColor
    },
    textWithIconContainerText: {
        marginLeft: 22,
        fontSize: 12,
        color: fontColor
    },
    topLeftRightText: {
        fontSize: 13,
        color: fontColor
    }
});

const modalLayout = StyleSheet.create({
    modalContainer: {
        margin: 0,
        marginBottom: 0,
        backgroundColor: backgroundGrey,
        // ...Platform.select({
        //     android: {
        //         marginTop: StatusBar.currentHeight
        //     }
        // })
    },
    body: {
        flex: 1, 
        backgroundColor: mainBgColor,
    },
    header: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        position: 'relative',
        padding: 15,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 18,
        color: fontColor,
        // letterSpacing: 1,
        marginLeft: 40,
        textTransform: 'uppercase'
    },
    headerMenuicon: {
        position: 'absolute',
        left: 15
    },
    bodyContent: {
        backgroundColor: mainBgColor,
        flex: 1,
        paddingTop: 12,
        marginTop: 15,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        overflow: 'hidden'
    }
});

const commonCard = StyleSheet.create({
    cardContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageContainer: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: primaryHexColor,
        textTransform: "uppercase",
        marginBottom: 5
    },
    cardDescription: {
        color: textMutedColor,
        textAlign: 'justify'
    }
});

const commonLabelDescription = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 3
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: fontColor
    },
    listLabelContainer: {
        width: 140
    },
    listSeperator: {
        width: 10,
    },
    labelText: {
        fontWeight: 'bold',
        color: '#555',
        fontSize: 12,
    },
    labelValue: {
        color: fontColor,
        fontSize: 12,
    },
    textWithIconContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        position: 'relative',
        marginTop: 2
    },
    textWithIconContainerIcon: {
        position: 'absolute',
        left: -1,
        top: 3,
        width: 18,
        textAlign: 'center',
        opacity: 0.70,
        color: circleBgColor
    },
    textWithIconContainerText: {
        marginLeft: 22,
        fontSize: 12,
        color: fontColor,
    }
});

const mapWithDetailsLayout = StyleSheet.create({
    mapcontainer: {
        ...StyleSheet.absoluteFillObject,
        height: (screenHeight / 2) - 100,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    detailsContainer: {
        flex: 1,
        marginTop: (screenHeight / 2) - 100,
        width: screenWidth
    },
    customerDetailsBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: primaryBlueHexColor,
    },
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'capitalize',
        marginBottom: 5
    },
    addressWithIconContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        position: 'relative',
        marginTop: 2
    },
    addressWithIconContainerIcon: {
        position: 'absolute',
        left: -1,
        width: 18,
        textAlign: 'center',
        opacity: 0.70,
        color: '#fff'
    },
    addressWithIconContainerText: {
        marginLeft: 22,
        color: '#fff'
    },
    buttonsBlockContainer: {
        flex:1, 
        flexDirection:"row", 
        maxHeight:70, 
        height: 70,
        borderBottomWidth: 1, 
        borderBottomColor: seperator, 
        paddingLeft: 50, 
        paddingRight: 50, 
        paddingTop: 10
    },
    buttonContainer: {
        flex : 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttonIcon: {
        flex: 1, 
        flexDirection: 'column', 
        color: primaryBlueHexColor
    },
    buttonText: {
        flex: 1, 
        flexDirection: 'column', 
        marginTop: 5, 
        fontSize: 12, 
        fontWeight: 'bold'
    }
});

const tabStyle = StyleSheet.create({
    tabBarUnderlineStyle: {
        backgroundColor: primaryHexColor
    },
    tabHeadingStyle: {
        backgroundColor: '#ffffff'
    },
    tabHeadingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 3
    },
    tabHeadingIcon: {
        fontSize: 16,
        color: '#333'
    },
    tabContentContainer: {
        backgroundColor: backgroundGrey
    }
});

const dashBoardStyle = StyleSheet.create({
    attendanceCard: {
        flex: 1,
        margin: 10,
        marginTop: 3,
        marginLeft: 20,
        marginRight: 20,
        padding: 0,
        // paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 8,
        overflow: 'hidden'
    },
    attendanceCardHeaderText: {
        fontSize: 14, 
        fontWeight: 'bold', 
        marginBottom: 5,
        color: fontColor
    },
    attendanceCardMainContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    attendanceCircle: {  
        marginBottom: 5,
        width:80,
        height:80,
        maxHeight: 80,
        borderRadius:100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attendanceShowNo: {
        width: '100%',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'normal',
    },
    attendanceShowText: {
        fontSize: 13,
        textAlign: 'center',
        justifyContent: 'center',
    },
    attendanceSquare: {  
        marginBottom: 5,
        height:100,
        borderRadius:10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SquareShowNo: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',
    },
    SquareShowText: {
        fontSize: 13,
        textAlign: 'center',
        justifyContent: 'center',
    },
    carouselHeading: {  
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    carouselHeadingLink: {  
        fontSize: 13, 
        fontWeight: 'normal'
    },
    carouselHeader: {
        marginBottom: 10,
        flex: 1, 
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 0,
    },
    carouselBody: {

    },
    carouselWithoutCard:{ 
        flex: 1,
        backgroundColor: backgroundGrey,
        margin: 12,
        padding: 5,
        marginBottom: 5
    },
    carouselWithoutCardData:{ 
        fontSize: 12, 
        color: fontColor, 
        fontWeight: 'normal',
    },
    carouselWithoutCardDataHeading: { 
        fontSize: 14,
        color: primaryHexColor, 
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }

});

const commonShowCountCarousel = StyleSheet.create({
    showSquareBox: {  
        backgroundColor: primarywhiteHexColor,
        width: 112,
        height: "100%",
        padding: 10,
        paddingTop: 15,
        borderRadius: 8,
        borderColor: '#e6e7e8',
        borderWidth: 1
    },
    showSquareBoxTextTop: {
        color: fontColor,
        borderRadius:100,
        alignSelf: 'center',
        textAlign: 'center'
    },
    showSquareBoxTextBottom: {
        textAlign: 'center',
        fontSize: 13,
        color: fontColor,
        fontWeight: 'bold',
    }
});

export {
    common,
    login,
    headerStyles,
    badgeCss,
    badgeCssXs,
    badgeColorCode,
    callLogCardLayout,
    modalLayout,
    commonCard,
    commonLabelDescription,
    mapWithDetailsLayout,
    tabStyle,
    dashBoardStyle,
    commonShowCountCarousel
}