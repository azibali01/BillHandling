import {
  Box,
  Button,
  Group,
  Stack,
  Table,
  TextInput,
  Title,
  Text,
  Select,
} from "@mantine/core";
import { useState } from "react";

interface ItemRow {
  section: string;
  size: string;
  qty: number;
  thickness: string;
  color: string;
  rate: number;
  discount: number;
}

export default function AluminumBilling() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rows, setRows] = useState<ItemRow[]>([
    {
      section: "",
      size: "",
      qty: 0,
      thickness: "",
      color: "",
      rate: 0,
      discount: 0,
    },
  ]);

  const handleChange = <T extends keyof ItemRow>(
    index: number,
    field: T,
    value: ItemRow[T]
  ) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        section: "",
        size: "",
        qty: 0,
        thickness: "",
        color: "",
        rate: 0,
        discount: 0,
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const calculateDiscounted = (row: ItemRow) => {
    const sizeNum = parseFloat(row.size) || 0;
    const total = sizeNum * row.qty * row.rate;
    return total - (total * row.discount) / 100;
  };

  const totalAmount = rows.reduce((acc, row) => {
    const sizeNum = parseFloat(row.size) || 0;
    return acc + sizeNum * row.qty * row.rate;
  }, 0);

  const totalDiscounted = rows.reduce((acc, row) => {
    return acc + calculateDiscounted(row);
  }, 0);

  return (
    <Box p="md">
      <Stack gap="md">
        <Box
          id="bill-content"
          bg="white"
          p="lg"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <Box mb="lg" style={{ borderBottom: "1px solid #ddd", paddingBottom: "1rem" }}>
            <Group justify="space-between" align="flex-start" wrap="wrap">
              <Stack gap={4} align="flex-start">
                <img
                  src="/Logo.png"
                  alt="Company Logo"
                  style={{ width: 140, height: 60, objectFit: "contain", borderRadius: 8 }}
                />
                <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
                  Aluminum Hardware Store
                </Text>
              </Stack>
              <Stack gap={2} align="center" style={{ flexGrow: 1 }}>
                <Title order={4}>Address</Title>
                <Text size="xs" c="gray" ta="center">
                  Badozai Street, Outside Bohar Gate, Multan, Pakistan
                </Text>
                <Text size="xs" c="gray">Mon–Sat | 10 AM – 10 PM</Text>
              </Stack>
              <Stack gap={4} align="flex-end">
                <Title order={2} style={{ fontWeight: 700, letterSpacing: 2 }}>Wahid Sons</Title>
                <Text size="xs" c="gray">Aluminum Hardware Store</Text>
                <Stack gap={1} mt={6}>
                  <Group gap="xs">
                    <Text fw={500} size="xs">Haji Umer Akram:</Text>
                    <Text size="xs" c="gray">0300-6341646</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw={500} size="xs">Haji Mak'ki Umer:</Text>
                    <Text size="xs" c="gray">0300-0793062</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
          </Box>

          <Stack gap="xs" maw={1200} w="100%">
            <Group wrap="wrap" grow>
              <TextInput label="Invoice No." value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.currentTarget.value)} />
              <TextInput label="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.currentTarget.value)} />
              <TextInput label="Date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
              <TextInput label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.currentTarget.value)} />
              <TextInput label="City" value="Multan" readOnly />
            </Group>
          </Stack>

          <Box mt="md" style={{ overflowX: "auto" }}>
            <Table withTableBorder highlightOnHover mt={20} fz="xs">
              <thead>
                <tr>
                  <th>S/No</th>
                  <th>Section</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Gaje</th>
                  <th>Color</th>
                  <th>Rate</th>
                  <th>Discount %</th>
                  <th>Amount</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td>{index + 1}</td>
                    <td><TextInput value={row.section} onChange={(e) => handleChange(index, "section", e.currentTarget.value)} size="xs" /></td>
                    <td><TextInput value={row.size} onChange={(e) => handleChange(index, "size", e.currentTarget.value)} size="xs" w={90} /></td>
                    <td><TextInput type="number" value={row.qty} onChange={(e) => handleChange(index, "qty", Number(e.currentTarget.value))} size="xs" w={90} /></td>
                    <td><Select data={["0.9", "1.1", "1.2", "1.4", "1.6", "2.0"]} value={row.thickness} onChange={(value) => handleChange(index, "thickness", value || "")} size="xs" w={90} checkIconPosition="right" /></td>
                    <td><Select data={["CH", "BLM", "WT", "SL"]} value={row.color} onChange={(value) => handleChange(index, "color", value || "")} size="xs" checkIconPosition="right" allowDeselect /></td>
                    <td><TextInput type="number" value={row.rate} onChange={(e) => handleChange(index, "rate", Number(e.currentTarget.value))} size="xs" /></td>
                    <td><TextInput type="number" value={row.discount} onChange={(e) => handleChange(index, "discount", Number(e.currentTarget.value))} size="xs" w={90} /></td>
                    <td>{calculateDiscounted(row).toFixed(2)}</td>
                    <td><Button color="red" size="xs" onClick={() => removeRow(index)}>Remove</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>

          <Group justify="end" mt="md">
            <Box
              p="sm"
              style={{ backgroundColor: "#f9f9f9", borderRadius: 8, border: "1px solid #eee", minWidth: 220 }}
            >
              <div><strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}</div>
              <div><strong>Discounted Amount:</strong> Rs. {totalDiscounted.toFixed(2)}</div>
            </Box>
          </Group>
        </Box>

        <Group justify="space-between" mt="xl" wrap="wrap">
          <Button onClick={addRow}>Add Item</Button>
          <Button>Save Bill</Button>
          <Button onClick={() => window.print()}>Print Bill</Button>
        </Group>
      </Stack>
    </Box>
  );
}
