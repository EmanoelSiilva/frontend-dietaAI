import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from "@/components/input";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userDataStore } from "@/store/dataLogin";
import { router } from "expo-router";

const schema = z.object({
  email: z.string().min(1, { message: "O e-mail é obrigatório" }),
  senha: z.string().min(1, { message: "A senha é obrigatória" }),
});

type FormData = z.infer<typeof schema>

export default function Login() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const setPageOne = userDataStore(state => state.setPageOne)

  const handleCreate = (data: FormData) => {
    setPageOne({
        email: data.email,
        senha: data.senha,
    })
    router.push("/register")
}

  return (
    <View style={styles.container}>
      {/* Gradiente */}
      <LinearGradient
        colors={['#3A7BD5', '#FFFFFF']}
        style={styles.gradient}
      >
        <Text style={styles.title}>Entrar</Text>
      </LinearGradient>

      {/* Formulário */}
      <View style={styles.form}>
        <Input
          placeholder="Digite seu e-mail"
          control={control}
          error={errors.email?.message}
          name='email'
          keyboardType='default'
        />
        <Input
          placeholder="Digite sua senha"
          control={control}
          error={errors.senha?.message}
          name='senha'
          keyboardType='default'
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.accessButton}
          onPress={handleSubmit(handleCreate)}
        >
          <Text style={styles.accessButtonText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OU</Text>

        {/* Botão Entrar com Google */}
        <TouchableOpacity style={styles.googleButton}>
          <MaterialCommunityIcons  name="google" size={20} color="#000" />
          <Text style={styles.googleButtonText}>Entrar com Google</Text>
        </TouchableOpacity>

        {/* Link para cadastro */}
        <Text style={styles.registerText}>
          Ainda não possui uma conta?{' '}
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  gradient: {
    height: 300,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  form: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  accessButton: {
    backgroundColor: '#003087',
    paddingVertical: 15,
    borderRadius: 34,
    alignItems: 'center',
    marginBottom: 20,
  },
  accessButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    borderRadius: 34,
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  registerLink: {
    color: '#003087',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
});
