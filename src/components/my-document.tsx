import { TRegister } from "@/context/registerStore";
import { convertDate } from "@/hooks/convert-date";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    marginBottom: 20,
    color: "#666666",
  },
  container: {
    marginBottom: 15,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: "left",
    color: "#666666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  gridItem: {
    width: "48%",
    marginRight: "2%",
    marginBottom: 10,
  },
});

// Componente PDF
export const MyDocument = ({
  name,
  createdAt,
  myEvents,
  otherEvents,
  actionsThatBroughtMe,
  actionsIWillTake,
  apprenticeship,
}: Omit<TRegister, "id">) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>{convertDate(createdAt)}</Text>

        {/* Eventos do dia */}
        <View style={styles.container}>
          <Text style={styles.sectionHeader}>
            Eventos fora do meu controle:
          </Text>
          <Text style={styles.text}>{otherEvents}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.sectionHeader}>Eventos sob o meu controle:</Text>
          <Text style={styles.text}>{myEvents}</Text>
        </View>

        {/* Ações em Grid */}
        <View style={styles.grid}>
          <View style={[styles.container, styles.gridItem]}>
            <Text style={styles.sectionHeader}>
              Ações que me trouxeram até aqui:
            </Text>
            {actionsThatBroughtMe.map((action, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>• </Text>
                <Text style={styles.itemText}>{action.desc}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.container, styles.gridItem]}>
            <Text style={styles.sectionHeader}>Ações que vou tomar agora:</Text>
            {actionsIWillTake.map((action, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>• </Text>
                <Text style={styles.itemText}>{action.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Aprendizados */}
        <View style={styles.container}>
          <Text style={styles.sectionHeader}>O que eu aprendi com isso?</Text>
          <Text style={styles.text}>{apprenticeship}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
