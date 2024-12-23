import { View, StyleSheet, Pressable, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { HeaderProps } from "@/interfaces/HeaderProps";

export function Header({ step, title }: HeaderProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Pressable
                        onPress={() => {
                            router.back()
                        }}
                    >
                        <Feather name="arrow-left" size={24} color='000' />
                    </Pressable>

                    <Text style={styles.txt}> {step} 
                        <Feather name="loader" size={16} color={colors.black}/>
                    </Text>
                </View>

                <Text style={styles.title}>{title}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
        marginBottom: 14,
        padding: Platform.OS === 'android' ? StatusBar.currentHeight! + 1 : 1
    },
    content: {
        paddingBottom: 34,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    txt: {
        fontSize: 18,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.background
    }
})