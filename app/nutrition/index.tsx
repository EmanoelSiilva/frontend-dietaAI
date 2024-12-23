import { View, Text, StyleSheet, Pressable, ScrollView , Share} from 'react-native';
import { userDataStore } from '@/store/data';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/colors';
import { ResponseData } from '@/interfaces/ResponseData';
import { Link, router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Nutrition() {

    const user = userDataStore(state => state.user)
    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if(!user) {
                    throw new Error("Falha ao carregar a dieta")
                }

                const response = await api.post<ResponseData>("./create", {
                    name: user.name,
                    weight: user.weight,
                    lenght: user.height,
                    age: user.age,
                    gender: user.gender,
                    objective: user.objective,
                    level: user.level,
                })

                return response.data.data
            } catch (error) {
                console.log("Error: ", error)
            }
        }
    })

    const shareDieta = async () => {
        try {
            if (data && Object.keys(data).length === 0) return ;

            const suplementos = `${data?.suplementos.map( item => `${item}`)}`

            const comidas = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map(alimento => `${alimento}`)}`)}`

            const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${comidas}\n\n- Dica Suplemento: ${suplementos}`
            await Share.share({
                message: message
            })
        } catch (error) {
            console.log(error)
        }
    }

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingTxt}>Estamos gerando sua dieta!</Text>
                <Text style={styles.loadingTxt}>Consultando IA...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingTxt}>Falha ao gerar dieta!</Text>
                <Link
                    href='/'
                >
                    <Text style={styles.loadingTxt}>Tente novamente</Text>
                </Link>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <Pressable 
                        style={styles.buttonShare}
                        onPress={() => shareDieta()}
                    >
                        <Text style={styles.buttonShareTxt}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Nome: {data.nome}</Text>
                        <Text style={styles.objective}>Foco: {data.objetivo}</Text>

                        <Text style={styles.label}>Refeições:</Text>
                        <ScrollView>
                            <View style={styles.foods}>
                                {data.refeicoes.map( (refeicao) => (
                                    <View key={refeicao.nome} style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodName}>{refeicao.nome}</Text>
                                            <Ionicons name='restaurant' size={16} color='#000' />
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Feather name='clock' size={14} color="#000" />
                                            <Text>Horario: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodTxt}>Alimentos: 
                                            {refeicao.alimentos.map(alimento => (
                                                <Text key={alimento}>{alimento}</Text>
                                            ))}
                                        </Text>
                                    </View>
                                ) )}
                            </View>

                            <View style={styles.suplementos}>
                                <Text style={styles.foodName}>Opções de suplementos: </Text>
                                {data.suplementos.map(item => (
                                    <Text key={item}>{item}</Text>
                                ))}
                            </View>
                            <Pressable  
                                style={styles.button}
                                onPress={() => router.replace("/")}
                            >
                                <Text style={styles.buttonTxt}>Gerar nova dieta</Text>
                            </Pressable>
                        </ScrollView>
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingTxt: {
        fontSize: 16,
        color: colors.white,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60, 
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold'
    },
    buttonShare: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4,
    },
    buttonShareTxt: {
        color: colors.white,
        fontWeight: '500'
    },
    name: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },
    objective: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 24,
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    foods: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },
    food: {
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 4,
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    foodTxt:{
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14
    },
    suplementos: {
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14, 
        borderRadius: 8,
    },
    button: {
        backgroundColor: colors.blue,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24,
    },
    buttonTxt: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})