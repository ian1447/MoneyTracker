"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface Bank {
  name: string;
  accountNumber: string;
  branch: string;
  balance: number;
}

export default function DashboardPage() {
  const [banks, setBanks] = useState<
    { name: string; accountNumber: string; branch: string; balance: string }[]
  >([]);

  const [ewallets, setEwallets] = useState<
    {
      provider: string;
      accountNumber: string;
      owner: string;
      balance: string;
    }[]
  >([]);

  const [onhands, setOnhands] = useState<
    { name: string; description: string; amount: string }[]
  >([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<
    "bank" | "ewallet" | "onhand" | null
  >(null);

  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    branch: "",
    balance: "0",
    provider: "",
    owner: "",
    description: "",
    amount: "",
  });

  const handleOpenDialog = (type: "bank" | "ewallet" | "onhand") => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: "",
      accountNumber: "",
      branch: "",
      balance: "",
      provider: "",
      owner: "",
      description: "",
      amount: "",
    });
  };

  const handleSave = () => {
    if (dialogType === "bank") {
      const { name, accountNumber, branch, balance } = formData;
      if (!name) return;
      setBanks([...banks, { name, accountNumber, branch, balance }]);
    } else if (dialogType === "ewallet") {
      const { provider, accountNumber, owner, balance } = formData;
      if (!provider || !accountNumber) return;
      setEwallets([...ewallets, { provider, accountNumber, owner, balance }]);
    } else if (dialogType === "onhand") {
      const { name, description, amount } = formData;
      if (!name || !amount) return;
      setOnhands([...onhands, { name, description, amount }]);
    }
    handleCloseDialog();
  };
  const handleOpen = (bank: any) => {
    setSelectedBank(bank);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBank(null);
  };

  const renderSection = (
    title: string,
    color: string,
    onAdd: () => void,
    children: React.ReactNode
  ) => (
    <Box sx={{ mb: 4, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: color, "&:hover": { bgcolor: `${color}cc` } }}
          onClick={onAdd}
        >
          Add
        </Button>
      </Box>
      <Divider />
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Box>
  );

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dashboard
      </Typography>

      {/* BANKS */}
      {renderSection(
        "Banks",
        "#1976d2",
        () => handleOpenDialog("bank"),
        banks.length === 0 ? (
          <Typography color="text.secondary">No bank records yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {banks.map((bank, i) => (
              <Grid key={i}>
                <Card
                  sx={{ borderRadius: 2, boxShadow: 2 }}
                  onClick={() => handleOpen(bank)}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {bank.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Balance: ₱{bank.balance}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      )}

      {/* E-WALLETS */}
      {renderSection(
        "E-Wallet",
        "#9c27b0",
        () => handleOpenDialog("ewallet"),
        ewallets.length === 0 ? (
          <Typography color="text.secondary">
            No e-wallet records yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {ewallets.map((wallet, i) => (
              <Grid key={i}>
                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {wallet.provider}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Account: {wallet.accountNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Owner: {wallet.owner}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Balance: ₱{wallet.balance}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      )}

      {/* ON-HAND */}
      {renderSection(
        "On-Hand",
        "#2e7d32",
        () => handleOpenDialog("onhand"),
        onhands.length === 0 ? (
          <Typography color="text.secondary">
            No on-hand cash records yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {onhands.map((cash, i) => (
              <Grid key={i}>
                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {cash.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {cash.description || "—"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Amount: ₱{cash.amount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Add{" "}
          {dialogType === "bank"
            ? "Bank"
            : dialogType === "ewallet"
            ? "E-Wallet"
            : "On-Hand"}
        </DialogTitle>

        <DialogContent>
          {/* Bank Fields */}
          {dialogType === "bank" && (
            <>
              <TextField
                fullWidth
                label="Bank Name"
                margin="dense"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Balance"
                type="number"
                margin="dense"
                value={0}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, balance: e.target.value })
                }
              />
            </>
          )}

          {/* E-Wallet Fields */}
          {dialogType === "ewallet" && (
            <>
              <TextField
                fullWidth
                label="Provider"
                margin="dense"
                value={formData.provider}
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Account Number"
                margin="dense"
                value={formData.accountNumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Owner Name"
                margin="dense"
                value={formData.owner}
                onChange={(e) =>
                  setFormData({ ...formData, owner: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Balance"
                type="number"
                margin="dense"
                value={formData.balance}
                onChange={(e) =>
                  setFormData({ ...formData, balance: e.target.value })
                }
              />
            </>
          )}

          {/* On-Hand Fields */}
          {dialogType === "onhand" && (
            <>
              <TextField
                fullWidth
                label="Cash Name / Label"
                margin="dense"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Description"
                margin="dense"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Amount"
                type="number"
                margin="dense"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* 💬 Modal for details */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Bank Details</DialogTitle>
        <DialogContent dividers>
          {selectedBank && (
            <>
              <Typography variant="body1">
                <strong>Bank:</strong> {selectedBank?.name}
              </Typography>
              <Typography variant="body1">
                <strong>Balance:</strong> ₱
                {selectedBank?.balance.toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
